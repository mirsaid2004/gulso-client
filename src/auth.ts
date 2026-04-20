import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        otp: {
          type: "text",
          label: "OTP",
          placeholder: "Enter your OTP",
        }
      }, 
      async authorize(credentials) {
        const res = await fetch("http://localhost:3000/api/auth/verify-otp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });

        const data = await res.json();

        if (res.ok && data.user) {
          return data.user;
        }

        return null;
      }
    })
  ],
});
