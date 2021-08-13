@UI @feature-login @full
Feature: Login

  Se requiere hacer login desde el portal de Prisma

  @login @TC-0001
  Scenario Outline: Login exitoso desde el portal de prisma
    Given Yo abro la pagina de login de Prisma
    Then Realizo login con el email "<user>" y el password "<password>"
    Examples:
      | id | testSetId | user                         | password   | channel | escenario   | habilitado |
      | 1  | 0         | usuariobilletera01@robot.com | Prisma2015 | 1       | WS_LOGIN_OK | Si         |
      | 2  | 0         | usuariobilletera01@robot.com | Prisma2015 | 1       | WS_LOGIN_OK | Si         |