import { NextRequest, NextResponse } from 'next/server';
import { api } from '@/lib/api-client';
import { ApiResponse, AuthResponse } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { refreshToken } = body;

    if (!refreshToken) {
      return NextResponse.json(
        { success: false, error: { code: "VALIDATION_ERROR", message: "Refresh token is required" } },
        { status: 400 }
      );
    }

    // Call the actual refresh endpoint
    const response = await api.post<ApiResponse<AuthResponse>>('/auth/refresh', {
      refreshToken,
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error('Refresh token error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: { 
          code: "REFRESH_TOKEN_ERROR", 
          message: "Failed to refresh token" 
        } 
      },
      { status: 401 }
    );
  }
}
