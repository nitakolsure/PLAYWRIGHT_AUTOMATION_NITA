@api
Feature: JSONPlaceholder users API
  As a consumer I want to fetch a single user.

  @smoke
  Scenario: TC-API-010 returns one user
    When I GET user 1
    Then the API status is 200
    And the user name is "Leanne Graham"
