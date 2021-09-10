@SUITE-ID_7304 @full @UI
Feature: Home

###############################
# Seccion Saldos
###############################

  @TEST-ID_71391
  Scenario: Carga de la pagina de Home correcta
    Given Un usuario "persona", con saldo disponible "true" y saldo en revision "true"
    #Se agrega la siguiente linea
    Then Ingreso al portal Todo Pago
    When El usuario se loguea al nuevo portal con la contraseña "Prisma2015"
    #Se cambia la siguiente linea ya que solo se valida el login exitoso
    #And La conexion con el MS cuenta virtual se realizó correctamente
    And Puedo loguearme a la cuenta
    Then La seccion Saldos se visualiza correctamente

  @TEST-ID_71392
  Scenario: Calculo del saldo a disponibilizar
    Given Un usuario "search", con saldo disponible "true" y saldo en revision "true"
    #Se agrega la siguiente linea
    Then Ingreso al portal Todo Pago
    When El usuario se loguea al nuevo portal con la contraseña "Prisma2015"
    #Se cambia la siguiente linea ya que solo se valida el login exitoso
    #And La conexion con el MS cuenta virtual se realizó correctamente
    And Puedo loguearme a la cuenta
    And hay saldo disponible
    And hay saldo en revision
    Then se calcula y valida saldo a disponibilizar

  ###############################
  # Seccion Movimientos
  ###############################
  
  @TEST-ID_71397
  Scenario: Visualizacion del titulo "Ultimos movimientos"
    Given Un usuario "con" transacciones
    #Se agrega la siguiente linea
    Then Ingreso al portal Todo Pago
    When El usuario se loguea al nuevo portal con la contraseña "Prisma2015"
    #Se cambia la siguiente linea ya que solo se valida el login exitoso
    #And La conexion con el MS cuenta virtual se realizó correctamente
    And Puedo loguearme a la cuenta
    Then Se visualiza el titulo que se lee "Últimos movimientos"

  @TEST-ID_71398
  Scenario: Visualizacion primeras 25 transacciones y boton redireccion a pantalla movimientos
    Given Un usuario "con" transacciones
    #Se agrega la siguiente linea
    Then Ingreso al portal Todo Pago
    When El usuario se loguea al nuevo portal con la contraseña "Prisma2015"
    #Se cambia la siguiente linea ya que solo se valida el login exitoso
    #And La conexion con el MS cuenta virtual se realizó correctamente
    And Puedo loguearme a la cuenta
    Then Se ven las primeras 25 transacciones o menos
    And Se visualiza link que se lee "Ver todos los movimientos" con una flecha que apunta a la derecha

  @TEST-ID_71399
  Scenario: Visualizacion de la seccion Últimos movimientos de un usuario sin movimientos
    Given Un usuario "sin" transacciones
    #Se agrega la siguiente linea
    Then Ingreso al portal Todo Pago
    When El usuario se loguea al nuevo portal con la contraseña "Prisma2015"
    #Se cambia la siguiente linea ya que solo se valida el login exitoso
    #And La conexion con el MS cuenta virtual se realizó correctamente
    And Puedo loguearme a la cuenta
    Then Se visualiza la seccion Últimos movimientos vacia