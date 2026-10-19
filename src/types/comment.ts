export interface CreateCommentRequest {
  content: string;
  rating: number;
}

export interface CommentResponse {
  id: number;
  content: string;
  userId: number;
  username: string;
  userAvatar: string;
  commentDate: string;
  rating: number;
  likesCount: number;
  dislikesCount: number;
}
