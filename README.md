# Cypress FRAMEWORK

## Resumen

Este proyecto contiene el template de proyecto inicial del framework Cypress, sobre el que deben basarse las pruebas automatizadas de Frontend (principalmente) y backend de la vertical Wallet. Tiene como objetivo ofrecer una forma sencilla de realizar pruebas automatizadas que requieran todo el sistema en funcionamiento y comprueba sus requisitos a fondo.

## Requisitos

Es necesario tener instalado:

* [NodeJS] (https://nodejs.org/en/download/) ya que este es la plataforma del proyecto.

## IDE

En el caso de Cypress se pueden utilizar otros IDE como “IntelliJ”, pero detectamos que cuenta con algunas limitaciones en su uso, por lo que recomendamos utilizar Visual Studio Code:

* [Descargar Visual Studio Code] (https://code.visualstudio.com/download)

## Plugins requeridos para el IDE VSCode

* [Cypress Helper] (https://marketplace.visualstudio.com/items?itemName=Shelex.vscode-cy-helper)
* [Run Cypress] (https://marketplace.visualstudio.com/items?itemName=coreylight.run-cy)
* [Cucumber (Gherkin) Full Support] (https://marketplace.visualstudio.com/items?itemName=alexkrechik.cucumberautocomplete)

Para mas información ver confluence en el siguiente link:

* [Manual-Ambiente] ()

## Instalación

Cypress es un framework impulsado por el motor NPM. Solo se requiere ejecitar el
siguiente comando:

`npm install`

## Ejecución

Ahora, realizados todos los pasos anteriores, podemos ejecutar de la siguiente forma:

`node runner.js --cypress {Cypress Option} --env configFile={Ambiente},TAGS='@{tags}' {--browser chrome/firefox/electron}`

- ### Cypress Option

| Comando | Descripción                                                   |
| :-----: | :------------------------------------------------------------ |
| run     | Ejecutas la pruebas en backgroun                              |
| open    | Abre la interfaz de cypress para pruebas de script y debugger |

- ### Ambiente

| Comando     | Archivo de configuración | Descripción                    |
| :---------: | :----------------------- | :----------------------------- |
| qa          | [qa.config.json] (cypress/config/qa.config.json)   | Para ambiente de pruebas QA    |
| dev         | dev.config.json          | Para pruebas locales           |
| pros        | prod.config.json         | Para pruebas en Producción     |

Nota: Los archivos de configuración se encuentran en la carpeta de `cypress/config`

- El navegador de `chrome` es el unico que puede usar la opción de debugger junto con la opción de `open`

Por ejemplo, usando los datos en las tablas, podriamos tener el siguiente comando:

`node runner.js --cypress run --env configFile=dev,TAGS='@full' --browser firefox`

Se puede generar el reporte unificado de las pruebas al finalizar la ejecución el cual puedes ver en la sección de `reports/{ambiente}`.

Para mas información ver confluence en el siguiente link:

* [Manual-Ejecución] ()

## Estructura del proyecto

```
├── cypress
│   ├── config
│   │   ├── # Aqui se agregaran los archivos de ambiente. Se definen URL, ENDPOINTS y conección para la BD
│   ├── fixtures
│   │   ├── queryDao.json # Aqui se agregan los query's para la capa de DAO's
│   │   ├── utils # Se generan json para estructuras de datos o constantes
│   │   └── forms
│   │       └── commons # Estructuras comunes usadas en el proyecto
│   ├── integration
│   │   ├── common
│   │   │   └── stepDefinitions # definicion de los steps de gherkin
│   │   |       ├── API # Para los steps de backend
|   │   |       └── UI  # Para los steps del Website
│   │   ├── dao # Sección de DAO´s para el proyecto
│   │   ├── features
│   │   |   ├── API # Para los steps de backend
|   │   |   └── UI  # Para los steps del Website
│   │   └── pages # Aqui se generan los Page Objects con los componentes de la pantalla
│   ├── plugins # Librerias y plugins de NodeJS
│   │   ├── dataBaseEnv.js # Se comsume la configuración de la BD por ambiente seleccionado
│   │   └── index.js # Archivo de configuración de plugins
│   ├── reports # Sección en donde se almacenaran los reportes de Mockawesome
│   ├── support
│   │   ├── commands.js     # Comandos de funciones generales del framework
│   │   ├── index.js        # Archivo de configuración de comandos para Cypress
│   │   └── keywords.js     # Funciones especificas de validación para el framework
├── cypress.json # Configuración general de Cypress
├── package.json # Archivo instalación de Cypress. Contiene librerias y los scripts de ejecución
└── runner.js # Configuración de ejecución. Contiene la configuración de reportes y los argumentos para la ejecución
```