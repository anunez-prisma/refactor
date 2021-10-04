@UI @feature-login @full @UI
Feature: Login

  Se requiere hacer login desde el portal de Prisma

  @TEST-ID_71388 @Prueba
  Scenario: Login Exitoso
    Given Ingreso al portal Todo Pago
    When Selecciono una cuenta de tipo "29"
    And El usuario se loguea al nuevo portal con la contraseña "Prisma2015"
    Then Puedo loguearme a la cuenta

  @TEST-ID_71389 @Prueba
  Scenario: Login Exitoso
    Given Ingreso al portal Todo Pago
    When Selecciono una cuenta de tipo "27"
    And El usuario se loguea al nuevo portal con la contraseña "Prisma2015"
    Then Puedo loguearme a la cuenta

  @TEST-ID_71390 @Prueba
  Scenario: Login Exitoso
    Given Ingreso al portal Todo Pago
    When Selecciono una cuenta de tipo "28"
    And El usuario se loguea al nuevo portal con la contraseña "Prisma2015"
    Then Puedo loguearme a la cuenta

  @TEST-ID_72085
  Scenario: Logout Exitoso
    Given Ingreso al portal Todo Pago
    And Selecciono una cuenta de tipo "27"
    And El usuario se loguea al nuevo portal con la contraseña "Prisma2015"
    When El usuario hace click sobre el modal de Logout
    Then Se genera el logout y se redirecciona al usuario a la pantalla de login

  @TEST-ID_72086
  Scenario: Logout Exitoso
    Given Ingreso al portal Todo Pago
    And Selecciono una cuenta de tipo "28"
    And El usuario se loguea al nuevo portal con la contraseña "Prisma2015"
    When El usuario hace click sobre el modal de Logout
    Then Se genera el logout y se redirecciona al usuario a la pantalla de login

  @TEST-ID_72087
  Scenario: Logout Exitoso
    Given Ingreso al portal Todo Pago
    And Selecciono una cuenta de tipo "29"
    And El usuario se loguea al nuevo portal con la contraseña "Prisma2015"
    When El usuario hace click sobre el modal de Logout
    Then Se genera el logout y se redirecciona al usuario a la pantalla de login