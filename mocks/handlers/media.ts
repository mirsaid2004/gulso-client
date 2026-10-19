import { http, HttpResponse } from "msw";
import { baseUrl } from "../instance";
import { ApiResponse, MediaFileResponse } from "@/types";

export const mediaHandlers = [
  // POST /api/v1/media
  http.post(`${baseUrl}/media`, () => {
    return HttpResponse.json({
      success: true,
      data: {
        id: 123,
        url: "https://via.placeholder.com/600",
        s3Key: "uploads/2026/05/image.jpg",
        originalName: "my-photo.jpg",
        contentType: "image/jpeg",
        sizeBytes: 2048576
      }
    });
  }),

  // DELETE /api/v1/media/{s3Key}
  http.delete(`${baseUrl}/media/:s3Key`, () => {
    return HttpResponse.json({ success: true, data: null });
  }),
];
