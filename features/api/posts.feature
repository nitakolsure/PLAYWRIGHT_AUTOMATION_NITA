@api
Feature: JSONPlaceholder posts API
  As a consumer I want post resources to follow the published contract.

  @smoke
  Scenario: TC-API-001 returns an existing post
    When I GET post 1
    Then the API status is 200
    And the post contract is valid for id 1

  @regression
  Scenario: TC-API-002 lists posts for one user
    When I GET posts for user 1
    Then the API status is 200
    And every listed post belongs to user 1

  @regression
  Scenario: TC-API-003 creates a post
    When I POST a new post
    Then the API status is 201
    And the created post echoes the payload

  @regression
  Scenario: TC-API-004 returns 404 when the post does not exist
    When I GET post 0
    Then the API status is 404
