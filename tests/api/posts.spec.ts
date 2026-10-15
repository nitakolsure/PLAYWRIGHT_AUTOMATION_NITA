import { test, expect } from '../../fixtures/test';

test('returns an existing post', async ({ postsApi }) => {
  const response = await postsApi.getPost(1);

  expect(response.status()).toBe(200);
  expect(response.ok()).toBeTruthy();

  const post = await response.json();
  expect(post.id).toBe(1);
  expect(post.userId).toBe(1);
  expect(post.title).toEqual(expect.any(String));
  expect(post.body).toEqual(expect.any(String));
});

test('lists posts for one user', async ({ postsApi }) => {
  const response = await postsApi.listPostsByUser(1);

  expect(response.status()).toBe(200);

  const posts = await response.json();
  expect(posts.length).toBeGreaterThan(0);
  for (const post of posts) {
    expect(post.userId).toBe(1);
  }
});

test('creates a post', async ({ postsApi }) => {
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

test('returns 404 when the post does not exist', async ({ postsApi }) => {
  const response = await postsApi.getPost(0);

  expect(response.status()).toBe(404);
  expect(response.ok()).toBeFalsy();
});
