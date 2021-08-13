@UI @feature-login @full
Feature: Login

  Se requiere validar el api login de Prisma

  @api-login @TC-0003
  Scenario Outline: Login exitoso desde el portal de prisma
    Given Api login se encuentra activo
    Then valido el servicio con el usuario "<user>" password "<password>" y channel <channel>
    Examples:
      | id | testSetId | user                         | password   | channel | escenario   | habilitado |
      | 1  | 0         | usuariobilletera01@robot.com | Prisma2015 | 1       | WS_LOGIN_OK | Si         |
      | 2  | 0         | usuariobilletera01@robot.com | Prisma2015 | 1       | WS_LOGIN_OK | Si         |