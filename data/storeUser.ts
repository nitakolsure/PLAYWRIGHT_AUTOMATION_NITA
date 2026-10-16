import { randomBytes } from 'crypto';

export function newStoreUser() {
  const suffix = `${Date.now()}${randomBytes(3).toString('hex')}`;
  return {
    username: `pwuser${suffix}`,
    password: process.env.STORE_PASSWORD ?? 'Pass1234',
  };
}

export const invalidStoreLogin = {
  username: 'pwuser',
  password: 'wrong-password',
};
