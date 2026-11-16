import { Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

When('I GET post {int}', async function (this: CustomWorld, id: number) {
  this.lastResponse = await this.postsApi().getPost(id);
  this.lastJson = await this.lastResponse.json();
});

When('I GET posts for user {int}', async function (this: CustomWorld, userId: number) {
  this.lastResponse = await this.postsApi().listPostsByUser(userId);
  this.lastJson = await this.lastResponse.json();
});

When('I POST a new post', async function (this: CustomWorld) {
  this.lastResponse = await this.postsApi().createPost({
    title: 'API testing',
    body: 'Send a request and check the response.',
    userId: 1,
  });
  this.lastJson = await this.lastResponse.json();
});

When('I GET user {int}', async function (this: CustomWorld, id: number) {
  this.lastResponse = await this.usersApi().getUser(id);
  this.lastJson = await this.lastResponse.json();
});

Then('the API status is {int}', function (this: CustomWorld, status: number) {
  expect(this.lastResponse?.status()).toBe(status);
});

Then('the post contract is valid for id {int}', function (this: CustomWorld, id: number) {
  expect(this.lastJson).toEqual(
    expect.objectContaining({
      id,
      userId: expect.any(Number),
      title: expect.any(String),
      body: expect.any(String),
    }),
  );
});

Then('every listed post belongs to user {int}', function (this: CustomWorld, userId: number) {
  const posts = this.lastJson as Array<{ userId: number }>;
  expect(posts.length).toBeGreaterThan(0);
  for (const post of posts) {
    expect(post.userId).toBe(userId);
  }
});

Then('the created post echoes the payload', function (this: CustomWorld) {
  expect(this.lastJson).toEqual(
    expect.objectContaining({
      title: 'API testing',
      userId: 1,
      id: expect.any(Number),
    }),
  );
});

Then('the user name is {string}', function (this: CustomWorld, name: string) {
  expect(this.lastJson).toEqual(
    expect.objectContaining({
      name,
      username: 'Bret',
      email: 'Sincere@april.biz',
    }),
  );
});
