/** Checks a single GET /users/{id} call. */
import { test, expect } from '../../fixtures/test';

test('returns one user', { tag: '@smoke' }, async ({ usersApi }) => {
  const response = await usersApi.getUser(1);

  expect(response.status()).toBe(200);
  expect(response.ok()).toBeTruthy();

  const user = await response.json();
  expect(user).toEqual(
    expect.objectContaining({
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
    }),
  );
});
