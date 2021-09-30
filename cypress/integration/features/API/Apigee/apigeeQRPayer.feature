###############
# Autor del Script: Antonio NR
# Fecha de creación: 27/09/2021
# Usuarios de modificación: 
#   #Usuario <Nombre del usuario> - Fecha: <Fecha de modificación>
#       Motivo : <Breve descripción>
#   #Usuario <Nombre del usuario> - Fecha: <Fecha de modificación>
#       Motivo : <Breve descripción>
# Descripción del script: Feature que realiza los test de Login TP
###############

################################################################
# API Login Automation Test
################################################################

@API @full
Feature: Flujo de pago sin encripción
  @apigee                                                                           
  Scenario Outline: Se realiza un pago mediante API QR Lapos sin bóveda
    Given La generación del token de ApiGee
        | grant_type    | basic_auth    |
        | <grant_type>  | <basic_auth>  |
    #Validar si el siguiente paso puede ser con parametros constantes ya que existen ejemplos en donde parte del body se obtienen de la fuente de datos
    When Se genera un QR Adquirente en RedBee
    And Se realiza el parse del QR "<card_number>"
        | cuit      |
        | <cuit>    |
    Then Se realiza el pago
        | cuit      | apikey    | escenario     | establishment_id      | card_number   | card_expiration       | security_code     | scheme    | type      | bank_id   | bank_description      | currency      |
        | <cuit>    | <apikey>  | <escenario>   | <establishment_id>    | <card_number> | <card_expiration>     | <security_code>   | <scheme>  | <type>    | <bank_id> | <bank_description>    | <currency>    |
    And Se validan los datos del pago
        | escenario     |
        | <escenario>   |
    Examples:
        | cuit          | apikey                            | grant_type        | basic_auth                                                            | card_number       | card_expiration  | security_code | scheme    | type      | bank_id   | bank_description  | currency  | numero_terminal_pos    | establishment_id  | importe   | cuotas    | escenario |
        | 30-71038088-7 | 8dc0282fbec1497a849b0c60b69567bd  | client_credentials| ZWJQanhpVTBCWHlEOEdzU2t0MFhYR09JMWo1NGY1OUI6dHF5dGJBQUczVnFLZXpRQw==  | 4546578000094639  | 08/23            | 936           | VISA      | CREDITO   | 7         | BANCO DE GALICIA  | ARS       | 12000360               | 3659302557        | 10.00     | 1         | WS_OK     |

