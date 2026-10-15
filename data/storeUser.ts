export function newStoreUser() {
  return {
    username: `pwuser${Date.now()}`,
    password: process.env.STORE_PASSWORD ?? 'Pass1234',
  };
}

export const invalidStoreLogin = {
  username: 'pwuser',
  password: 'wrong-password',
};
