import { http, HttpResponse } from "msw";
import { baseUrl } from "../instance";
import { db, nextId } from "../db";
import { ApiResponse, CommentResponse, CreateCommentRequest } from "@/types";

function findComment(id: unknown) {
  return db.comments.find((c) => c.id === Number(id));
}

export const commentHandlers = [
  // GET /api/v1/products/:productId/comments
  http.get(`${baseUrl}/products/:productId/comments`, ({ params }) => {
    const productId = Number(params.productId);
    const comments = db.comments.filter((c) => c.productId === productId);
    return HttpResponse.json({
      success: true,
      data: comments,
      meta: { currentPage: 0, lastPage: 1, perPage: 20, total: comments.length },
    });
  }),

  // POST /api/v1/products/:productId/comments
  http.post<any, CreateCommentRequest, ApiResponse<CommentResponse>>(
    `${baseUrl}/products/:productId/comments`,
    async ({ params, request }) => {
      const productId = Number(params.productId);
      const body = await request.json();

      const comment = {
        id: nextId(db.comments),
        productId,
        content: body.content,
        userId: 123,
        username: "current_user",
        userAvatar: "",
        commentDate: new Date().toISOString(),
        rating: body.rating,
        likesCount: 0,
        dislikesCount: 0,
      };
      db.comments.push(comment);
      return HttpResponse.json({ success: true, data: comment });
    }
  ),

  // DELETE /api/v1/comments/:commentId
  http.delete(`${baseUrl}/comments/:commentId`, ({ params }) => {
    db.comments = db.comments.filter((c) => c.id !== Number(params.commentId));
    return HttpResponse.json({ success: true, data: null });
  }),

  // POST /api/v1/comments/:commentId/like
  http.post(`${baseUrl}/comments/:commentId/like`, ({ params }) => {
    const comment = findComment(params.commentId);
    if (!comment) return HttpResponse.json({ success: false, data: null } as any, { status: 404 });
    comment.likesCount = (comment.likesCount ?? 0) + 1;
    return HttpResponse.json({ success: true, data: comment });
  }),

  // POST /api/v1/comments/:commentId/dislike
  http.post(`${baseUrl}/comments/:commentId/dislike`, ({ params }) => {
    const comment = findComment(params.commentId);
    if (!comment) return HttpResponse.json({ success: false, data: null } as any, { status: 404 });
    comment.dislikesCount = (comment.dislikesCount ?? 0) + 1;
    return HttpResponse.json({ success: true, data: comment });
  }),
];
