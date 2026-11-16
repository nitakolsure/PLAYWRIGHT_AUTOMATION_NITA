@store @ui
Feature: Demoblaze cart and order
  As a shopper I want to add products and place an order.

  Background:
    Given I am logged in to the store
    And the cart is empty

  @e2e
  Scenario: TC-UI-020 adds a Samsung phone and a laptop then places the order
    When I add a Samsung phone and a laptop
    And I open the cart
    Then the cart contains 1 "Samsung galaxy s6"
    And the cart contains 1 "Sony vaio i5"
    When I place the sample order
    Then the purchase is confirmed

  @regression
  Scenario: TC-UI-021 blocks purchase when the order form is empty
    When I add "Samsung galaxy s6" from "Phones"
    And I open the cart
    And I purchase with an empty order form
    Then the purchase alert contains "Please fill out Name and Creditcard."

  @e2e
  Scenario: TC-UI-022 removes the laptop and places the order for the Samsung phone
    When I add a Samsung phone and a laptop
    And I open the cart
    And I remove "Sony vaio i5" from the cart
    Then the cart contains 1 "Samsung galaxy s6"
    When I place the sample order
    Then the purchase is confirmed
