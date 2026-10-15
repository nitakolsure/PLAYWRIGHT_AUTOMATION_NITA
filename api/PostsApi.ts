import { type APIRequestContext, type APIResponse } from '@playwright/test';

export type NewPost = {
  title: string;
  body: string;
  userId: number;
};

export class PostsApi {
  constructor(private readonly request: APIRequestContext) {}

  getPost(id: number): Promise<APIResponse> {
    return this.request.get(`/posts/${id}`);
  }

  listPostsByUser(userId: number): Promise<APIResponse> {
    return this.request.get('/posts', { params: { userId } });
  }

  createPost(post: NewPost): Promise<APIResponse> {
    return this.request.post('/posts', { data: post });
  }
}
