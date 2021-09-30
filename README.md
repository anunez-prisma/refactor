# Cypress FRAMEWORK

## Resumen

Este proyecto contiene el template de proyecto inicial del framework Cypress, sobre el que deben basarse las pruebas automatizadas de Frontend (principalmente) y backend de la vertical Wallet. Tiene como objetivo ofrecer una forma sencilla de realizar pruebas automatizadas que requieran todo el sistema en funcionamiento y comprueba sus requisitos a fondo.

## Requisitos

Es necesario tener instalado:

* [NodeJS](https://nodejs.org/en/download/)

## IDE

En el caso de Cypress se pueden utilizar otros IDE como “IntelliJ”, pero detectamos que cuenta con algunas limitaciones en su uso, por lo que recomendamos utilizar Visual Studio Code:

* [Descargar Visual Studio Code](https://code.visualstudio.com/download)

## Plugins requeridos para el IDE VSCode

* [Cypress Helper](https://marketplace.visualstudio.com/items?itemName=Shelex.vscode-cy-helper)
* [Run Cypress](https://marketplace.visualstudio.com/items?itemName=coreylight.run-cy)
* [Cucumber (Gherkin) Full Support](https://marketplace.visualstudio.com/items?itemName=alexkrechik.cucumberautocomplete)

Para mas información ver confluence en el siguiente link:

* [Manual-Ambiente](https://confluence.prismamp.com/x/CIGXBg)

## Instalación

Cypress es un framework impulsado por el motor NPM. Solo se requiere ejecitar el
siguiente comando:

```
$ npm install
```

## Ejecución

Ahora, realizados todos los pasos anteriores, podemos ejecutar de la siguiente forma:
```
$ node runner.js --cypress {Cypress Option} --env configFile={Ambiente},TAGS='{Tags}'{Report Portal Option} {Browser}`
```

### Cypress Option <a name="cypress-option"></a>


| Comando | Descripción                                                   |
| :-----: | :------------------------------------------------------------ |
| run     | Ejecutas la pruebas en background                             |
| open    | Abre la interfaz de cypress para pruebas de script y debugger |

### Ambiente


| Comando     | Archivo de configuración                            | Descripción                    |
| :---------: | :-------------------------------------------------- | :----------------------------- |
| qa          | [qa.config.json](cypress/config/qa.config.json)     | Para ambiente de pruebas QA    |
| dev         | [dev.config.json](cypress/config/dev.config.json)   | Para pruebas locales           |
| pros        | [prod.config.json](cypress/config/prod.config.json) | Para pruebas en Producción     |

Nota: Los archivos de configuración se encuentran en la carpeta de `cypress/config`.
   
### Tags

| Comando | Ejemplo                         | Descripción                                                                       |
| :-----: | :-----------------------------: | :-------------------------------------------------------------------------------- |
| not     | TAGS='@full not @ignore'        | Se ejecutarian todos los scripts con el tag full pero no si tienen el tag ignore  |
| and     | TAGS='@smokeTest and @login'    | Se ejecutan los scripts con tag smoTtest y los que tengan el tag login            |
| or      | TAGS='@login1 or @login2'       | Se ejecutan scrips que tengan el tag login1 o el tag login2                       |

Nota: Para mas información consultar las buenas practicas de taggeo en el siguiente link [ver]()

### Report Portal Option

| Comando | Descripción                                                   |
| :-----: | :------------------------------------------------------------ |
| true    | Ejecutas la pruebas con registro en el portal configurado de Report Portal. El reporte de Mochawesome si se genera |
| false   | Ejecutas la pruebas sin registro en el portal configurado de Report Portal. El reporte de Mochawesome si se genera |

### Browser

| Comando   | Descripción                                                                                                        |
| :-------: | :----------------------------------------------------------------------------------------------------------------- |
| chrome    | Ejecuta las pruebas en chrome. Si esta la opción `open` de cypress se activara por default la opción de debbuger   |
| firefox   | Ejecuta las pruebas en Firefox                                                                                     |
| electron  | Ejecuta las pruebas en Electron. Esta opción es el navegador por default en caso de no poner el comando `-browser` |

Nota: Cuando se ejecuta `open` para [Cypress Option](#cypress-option) no es necesario especificar el navegador.

Por ejemplo, usando los datos en las tablas, podriamos tener el siguiente comando:
```
$ node runner.js --cypress run --env configFile=dev,TAGS='@full',reportPortal=false --browser firefox`
```

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

## Base de datos
Las credenciales e información de base de datos se encuentra en los archivos de configuración por ambiente([ver](#ambiente)) y debe contener la siguiente información:

```
"db": {
    "userName": usuario de la base de datos,
    "password": password,
    "server": hostname de la base de datos,
    "port": puerto de la base de datos,
    "options": {
        "database": base de datos en la cual se trabajara,
        "encrypt": por defecto es true,
        "rowCollectionOnRequestCompletion" : por defecto es true
    }
}
```

Los queries se agregan en el siguiente archivo:

- [queryDao.json](cypress/fixtures/queryDao.json)

Para agregar un query existen dos maneras descritas a continuación:

### Directa

Se agrega una estructura como:

```
{
    "UserStatement" : {                                                      # Se anidan consultas para pedir información sobre el usaurio
        "getUsers" : "SELECT * FROM Usuario_Cuenta",                                                # Se declara el query sin parametros
        "getUsersByEmail" : "SELECT * FROM Usuario_Cuenta c WHERE email = '{0}'",                   # Se declara el query con 1 parametro
        "getUsersByEmailAndId": "SELECT * FROM Usuario_Cuenta c WHERE email = '{0}', AND id = {1}"  # Se declara el query con 2 parametros
        ...
    }
    ...
}
```


Usandolo en código tendrias que usar algo como esto:

```
...
cy.sqlServer(UserStatement.getUsers).as('userData');                                        # Se declara el query sin parametros
...
cy.sqlServer(format(UserStatement.getUsersByEmail, 'email')).as('userData');                # Se declara el query con 1 parametro
...
cy.sqlServer(format(UserStatement.getUsersByEmailAndId, 'email', 'id')).as('userData');     # Se declara el query con 2 parametros
...
```

### Inirecta

Se agrega una estructura como:

```
{
    "UserStatement" : {                                                      # Se anidan consultas para pedir información sobre el usaurio
        "userInfoByConditional" : {
            "query" : "Select name FROM user {valor_condicionA} {valor_condicionB}",          # La intención es concatenar las opciones que completen el query
            "condicionA" : {
                "opcion1" : "WHERE id = 1",
                "opcion2" : "WHERE id = 2"
            },
            "condicionB" : {
                "opcion1" : "AND type = A",
                "opcion2" : "AND type = B"
            }
        }
        ...
    }
    ...
}
```

Usandolo en código tendrias que usar algo como esto:

```
cy.sqlServer(
            format(UserStatement.userInfoByConditional.query, 
                    UserStatement.userInfoByConditional.condicionA[opcion1], 
                    UserStatement.userInfoByConditional.condicionB[opcion2])).as('dataUser');

### Aqui el query terminaria siendo 'Select name FROM user WEHRE id = 1 AND type = B'

```

```
cy.sqlServer(
            format(UserStatement.userInfoByConditional.query, 
                    UserStatement.userInfoByConditional.condicionA[opcion2], 
                    UserStatement.userInfoByConditional.condicionB[opcion1])).as('dataUser');
                    
### Aqui el query terminaria siendo 'Select name FROM user WEHRE id = 2 AND type = A'

```
## Report Portal

Para poder general una ejecución en Report Portal es necesario tener la opción de `reportPortal=true` [ver](#report-portal-option).

La configuración esta en el archivo [runner.js](runner.js) y debe ser la siguiente:

```
{
    "reporter": "cypress-multi-reporters",
    "reporterOptions": {
        "reporterEnabled": ["@reportportal/agent-js-cypress", "mochawesome"],
        "mochawesomeReporterOptions": {
            ## Opciones de reporte para mochawesome
        },
        "reportportalAgentJsCypressReporterOptions": {
        "endpoint": "{hostname}/api/v1",
        "token": "00000000-0000-0000-0000-000000000000",
        "launch": "TEST_EXAMPLE",
        "project": "project1",
        "reportHooks": false,
        "autoMerge": true
        }
    }
}
```

Nota 1: Para mas info [ver](https://github.com/reportportal/agent-js-cypress)

Nota 2: Solo se generan reportes cuando seleccionas la opción `run` de [Cypress Option](#cypress-option)

## Mochawesome

Se puede generar el reporte unificado de las pruebas al finalizar la ejecución el cual puedes ver en la sección de `reports/{ambiente}/{fecha de ejecución}/Run-Report.html`.

La configuración esta en el archivo [runner.js](runner.js) y debe ser la siguiente:

```
{
    reporter: 'mochawesome',
    reporterOptions: {
        reportDir: 'reports/' + environment + "/" + "Test Run - " + currRunTimestamp + '/mochawesome-report',
        overwrite: false,
        html: true,
        json: true
    }        
}
```


Nota 1: El reporte de Mochawesome también se generara cuando se selecione la opcion de [Report Portal](#report-portal)

Nota 2: Solo se generan reportes cuando seleccionas la opción `run` de [Cypress Option](#cypress-option)