/** Checks the JSONPlaceholder posts contract. */
import { test, expect } from '../../fixtures/test';

test('returns an existing post', { tag: '@smoke' }, async ({ postsApi }) => {
  const response = await postsApi.getPost(1);

  expect(response.status()).toBe(200);
  expect(response.ok()).toBeTruthy();

  const post = await response.json();
  expect(post).toEqual(
    expect.objectContaining({
      id: 1,
      userId: 1,
      title: expect.any(String),
      body: expect.any(String),
    }),
  );
});

test('lists posts for one user', { tag: '@regression' }, async ({ postsApi }) => {
  const response = await postsApi.listPostsByUser(1);

  expect(response.status()).toBe(200);

  const posts = await response.json();
  expect(posts.length).toBeGreaterThan(0);
  for (const post of posts) {
    expect(post).toEqual(
      expect.objectContaining({
        userId: 1,
        id: expect.any(Number),
        title: expect.any(String),
        body: expect.any(String),
      }),
    );
  }
});

test('creates a post', { tag: '@regression' }, async ({ postsApi }) => {
  const newPost = {
    title: 'API testing',
    body: 'Send a request and check the response.',
    userId: 1,
  };

  const response = await postsApi.createPost(newPost);

  expect(response.status()).toBe(201);

  const created = await response.json();
  expect(created).toMatchObject(newPost);
  expect(created.id).toEqual(expect.any(Number));
});

test('returns 404 when the post does not exist', { tag: '@regression' }, async ({ postsApi }) => {
  const response = await postsApi.getPost(0);

  expect(response.status()).toBe(404);
  expect(response.ok()).toBeFalsy();
});
