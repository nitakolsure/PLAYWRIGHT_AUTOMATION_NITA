@store @ui
Feature: Demoblaze login
  As a shopper I want to register and log in so I can use the store.

  @smoke
  Scenario: TC-UI-010 logs in with a new account
    Given I open the Demoblaze store
    When I sign up a new store user
    Then the sign up alert is "Sign up successful."
    When I log in with that new user
    Then I am welcomed as that user

  @regression
  Scenario: TC-UI-011 rejects a wrong password
    Given I open the Demoblaze store
    When I log in with a wrong password
    Then the login is rejected
    And I remain logged out

  @regression
  Scenario: TC-UI-012 rejects a blank password
    Given I open the Demoblaze store
    When I log in with a blank password
    Then the login alert contains "Please fill out Username and Password."
    And I remain logged out
