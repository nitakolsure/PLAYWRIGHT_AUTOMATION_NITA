import { type APIRequestContext, type APIResponse } from '@playwright/test';

export class UsersApi {
  constructor(private readonly request: APIRequestContext) {}

  getUser(id: number): Promise<APIResponse> {
    return this.request.get(`/users/${id}`);
  }
}
