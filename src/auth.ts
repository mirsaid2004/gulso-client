import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { api } from "@/lib/api-client";
import { CONFIG } from "@/config";
import { ApiResponse, AuthResponse } from "@/types";

const API_BASE_URL = CONFIG.API_BASE_URL;

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: token.refreshToken }),
    });

    if (!response.ok) throw new Error("RefreshAccessTokenError");

    const result: ApiResponse<AuthResponse> = await response.json();
    const { data } = result;

    if (!result.success || !data) {
      throw new Error("RefreshAccessTokenError");
    }

    return {
      ...token,
      accessToken: data.accessToken,
      accessTokenExpires: Date.now() + data.expiresIn * 1000,
      refreshToken: data.refreshToken,
      roles: data.roles,
      error: undefined,
    };
  } catch (error) {
    console.error("Error refreshing access token:", error);

    return {
      ...token,
      accessToken: "",
      accessTokenExpires: 0,
      refreshToken: "",
      error: "RefreshAccessTokenError",
    };
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        phone: {
          type: "text",
          label: "Phone",
          placeholder: "Enter your phone number",
        },
        otp: {
          type: "text",
          label: "OTP",
          placeholder: "Enter your OTP",
        }
      },
      async authorize(credentials) {
        try {
          const response = await api.post<ApiResponse<AuthResponse>>('/auth/otp/login', {
            phone: credentials.phone,
            otpCode: credentials.otp,
          });

          const { data } = response;

          if (response.success && data) {
            return {
              id: data.userId.toString(),
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
              expiresIn: data.expiresIn,
              roles: data.roles,
              userId: data.userId,
              name: data.name,
            };
          }

          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        return {
          accessToken: user.accessToken,
          accessTokenExpires: Date.now() + user.expiresIn * 1000,
          refreshToken: user.refreshToken,
          roles: user.roles,
          error: undefined,
        };
      }

      // Return previous token if still valid
      if (Date.now() < (token.accessTokenExpires || 0)) {
        return token;
      }

      // Access token has expired, try to refresh
      return refreshAccessToken(token);
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub || "";
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.roles = token.roles;
        session.error = token.error;
      }

      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: "jwt",
  },
  // Required for NextAuth v5 on non-HTTPS hosts (localhost)
  trustHost: true,
  secret: process.env.AUTH_SECRET,
});
