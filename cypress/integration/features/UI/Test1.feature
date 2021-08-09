@UI
Feature: Navigating to google.com and verifying title
  @smoke @test
    Scenario: Realizando la navegacion
      Given I open the google web url
      Then I verify title of the web page as 'Google'