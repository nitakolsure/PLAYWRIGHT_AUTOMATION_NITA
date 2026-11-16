import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { invalidStoreLogin, newStoreUser } from '../../data/storeUser';
import { CustomWorld } from '../support/world';

Given('I open the Demoblaze store', async function (this: CustomWorld) {
  await this.storePage().goto();
});

Given('I am logged in to the store', async function (this: CustomWorld) {
  this.storeUser = newStoreUser();
  await this.storePage().goto();
  const signUpMessage = await this.signUpPage().signUp(this.storeUser.username, this.storeUser.password);
  expect(signUpMessage).toBe('Sign up successful.');
  this.lastAlert = await this.loginPage().login(this.storeUser.username, this.storeUser.password);
  await this.storePage().expectLoggedInAs(this.storeUser.username);
});

When('I sign up a new store user', async function (this: CustomWorld) {
  this.storeUser = newStoreUser();
  this.lastAlert = await this.signUpPage().signUp(this.storeUser.username, this.storeUser.password);
});

Then('the sign up alert is {string}', async function (this: CustomWorld, expected: string) {
  expect(this.lastAlert).toBe(expected);
});

When('I log in with that new user', async function (this: CustomWorld) {
  if (!this.storeUser) {
    throw new Error('No signed-up user in this scenario.');
  }
  this.lastAlert = await this.loginPage().login(this.storeUser.username, this.storeUser.password);
});

Then('I am welcomed as that user', async function (this: CustomWorld) {
  if (!this.storeUser) {
    throw new Error('No signed-up user in this scenario.');
  }
  await this.storePage().expectLoggedInAs(this.storeUser.username);
});

When('I log in with a wrong password', async function (this: CustomWorld) {
  this.lastAlert = await this.loginPage().login(invalidStoreLogin.username, invalidStoreLogin.password);
});

When('I log in with a blank password', async function (this: CustomWorld) {
  this.lastAlert = await this.loginPage().login('pwuser', '');
});

Then('the login is rejected', function (this: CustomWorld) {
  expect(this.lastAlert).toMatch(/Wrong password|User does not exist/);
});

Then('the login alert contains {string}', function (this: CustomWorld, expected: string) {
  expect(this.lastAlert).toContain(expected);
});

Then('I remain logged out', async function (this: CustomWorld) {
  await this.storePage().expectLoggedOut();
});
