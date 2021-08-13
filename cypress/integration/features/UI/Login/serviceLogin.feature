@UI @feature-service-login
Feature: Login

  Se requiere hacer login desde el portal de Prisma con DB de QA

  @service-login @TC-0002
  Scenario: Login exitoso desde el portal de prisma con DB de QA
    Given Yo abro la pagina de login de Prisma
    Then Realizo login con los datos de la base de datos de qa