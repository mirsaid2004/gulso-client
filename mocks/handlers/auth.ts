import { http, HttpResponse } from "msw";
import { baseUrl } from "../instance";
import {
  AuthResponse,
  LoginWithOtpRequest,
  SendOtpRequest,
  RefreshTokenRequest,
  DeleteAccountRequest,
  ApiResponse,
  Role
} from "@/types";

export const authHandlers = [
  // POST /api/v1/auth/otp/send
  http.post<any, SendOtpRequest, ApiResponse<string>>(`${baseUrl}/auth/otp/send`, async ({ request }) => {
    const body = await request.json();
    if (!body.phone) {
      return HttpResponse.json({
        success: false,
        data: "",
        error: { code: "VALIDATION_ERROR", message: "Phone is required" }
      }, { status: 400 });
    }
    return HttpResponse.json({
      success: true,
      data: "OTP sent successfully"
    });
  }),

  // POST /api/v1/auth/otp/login
  http.post<any, LoginWithOtpRequest, ApiResponse<AuthResponse>>(`${baseUrl}/auth/otp/login`, async ({ request }) => {
    const body = await request.json();
    if (body.otpCode === "123456") {
      return HttpResponse.json({
        success: true,
        data: {
          accessToken: "mock-access-token",
          refreshToken: "mock-refresh-token",
          tokenType: "Bearer",
          expiresIn: 3600,
          userId: 123,
          name: "John Doe",
          roles: [Role.USER, Role.SELLER]
        }
      });
    }
    return HttpResponse.json({
      success: false,
      data: {} as AuthResponse,
      error: { code: "UNAUTHORIZED", message: "Invalid OTP" }
    }, { status: 401 });
  }),

  // POST /api/v1/auth/refresh
  http.post<any, RefreshTokenRequest, ApiResponse<AuthResponse>>(`${baseUrl}/auth/refresh`, () => {
    return HttpResponse.json({
      success: true,
      data: {
        accessToken: "new-mock-access-token",
        refreshToken: "new-mock-refresh-token",
        tokenType: "Bearer",
        expiresIn: 3600,
        userId: 123,
        name: "John Doe",
        roles: [Role.USER]
      }
    });
  }),

  // POST /api/v1/auth/logout
  http.post(`${baseUrl}/auth/logout`, () => {
    return HttpResponse.json({ success: true, data: null });
  }),

  // POST /api/v1/auth/delete/request
  http.post(`${baseUrl}/auth/delete/request`, () => {
    return HttpResponse.json({ success: true, data: "OTP for account deletion sent" });
  }),

  // POST /api/v1/auth/delete/confirm
  http.post<any, DeleteAccountRequest, ApiResponse<string>>(`${baseUrl}/auth/delete/confirm`, async ({ request }) => {
    const body = await request.json();
    if (body.otpCode === "123456") {
      return HttpResponse.json({ success: true, data: "Account successfully deleted" });
    }
    return HttpResponse.json({
      success: false,
      data: "",
      error: { code: "VALIDATION_ERROR", message: "Invalid OTP" }
    }, { status: 400 });
  }),
];
