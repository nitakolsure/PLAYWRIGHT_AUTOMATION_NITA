@docs @ui
Feature: Playwright documentation
  As a reader I want the public docs site to load so I can start installation.

  @smoke
  Scenario: TC-UI-001 documentation title
    Given I open the Playwright documentation
    Then the documentation title contains Playwright

  @regression
  Scenario: TC-UI-002 get started opens installation
    Given I open the Playwright documentation
    When I open the Get started link
    Then the Installation heading is visible
