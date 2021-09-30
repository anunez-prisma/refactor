const cypress = require('cypress')
const marge = require('mochawesome-report-generator')
const { merge } = require('mochawesome-merge')
const moment = require('moment')

// get current run timestamp
const currRunTimestamp = getTimeStamp();

//Get cypress CLI options using 'minimist
const args = require('minimist')(process.argv.slice(2));

//mechanism to identify which environment is being used
//get environment from args..
const environment = getEnvironment(args);

const reportOptions = getReportOption(args);


function getReportOption(args){
    const getEnv = args.env.split(",");
    const envProperty = getEnv[2].split("=");
    if(envProperty[0] === 'reportPortal' && envProperty[1] === 'true'){
        return {
            "reporter": "cypress-multi-reporters",
            "reporterOptions": {
                "reporterEnabled": ["@reportportal/agent-js-cypress", "mochawesome"],
                "mochawesomeReporterOptions": {
                    reportDir: 'reports/' + environment + "/" + "Test Run - " + currRunTimestamp + '/mochawesome-report',
                    overwrite: false,
                    html: true,
                    json: true
                },
                "reportportalAgentJsCypressReporterOptions": {
                "endpoint": "http://192.168.76.114:8080/api/v1",
                "token": "0111d481-b833-43a9-868d-9763098bf314",
                "launch": "superadmin_TEST_EXAMPLE",
                "project": "cypress_poc",
                "timeout": 30000,
                "description": "cypress_poc",
                "reportHooks": false,
                "autoMerge": true
                }
            }
        }
    }else{
        return {
            reporter: 'mochawesome',
            reporterOptions: {
                reportDir: 'reports/' + environment + "/" + "Test Run - " + currRunTimestamp + '/mochawesome-report',
                overwrite: false,
                html: true,
                json: true
            }        
        }
    }
}

//**********Agregado para determinar ambientes en los reportes de ejecucion**********
// identify an environment; default is "qa"
function getEnvironment(args){
 let environment;

  if(args.env){
    if(args.env === true){
    // if --env flag is passed from CLI but without following any   arguments
        environment = "qa";
        return "qa";
    }

  const getEnv = args.env.split(",");
  getEnv.map((curr, index) => {
    const envProperty = curr.split("=");
    if(envProperty[0] === 'configFile'){
        environment = envProperty[1];
    }

// if --env flag is passed from CLI, but doesn't contain any 'configFile' argument
    if(index >= getEnv.length && environment === undefined){
      environment = "qa";
    }

 })

 return environment;

} else{
// if no --env flag is passed from CLI
    environment = "qa";
    return "qa";
 }
}

// **********Configuracion para el armado y unificacion de reportes individurales de Mocha*********

//source directory where individual test reports are created
const sourceReport = {
    files: ["./reports/" + environment + "/" + "Test Run - " + currRunTimestamp + "/mochawesome-report/*.json"],
}

//destination directory where we want our unified .html and .json file to be placed
const finalReport = {
    reportDir: 'reports/' + environment + "/" + "Test Run - " + currRunTimestamp,
    saveJson: true,
    reportFilename: 'Run-Report',
    reportTitle: 'Run-Report',
    reportPageTitle: 'Run-Report'
}

//Cypree Module API
if(args.cypress == 'open'){
    cypress.open({
        ...args
    })
}else{
    cypress.run({
        ...args,
        config: {
            pageLoadTimeout: 10000,
            screenshotsFolder: 'reports/' + environment + "/" + "Test Run - " + currRunTimestamp + '/screenshots',
            video: true,
            videosFolder: 'reports/' + environment + "/" + "Test Run - " + currRunTimestamp + '/videos'
        },
        ...reportOptions
    }).then(result => {
    
        // generate a unified report, once Cypress test run is done
            generateReport()
            .then(() => {
                console.log("All Reports merged");
            })
            .catch(err => {
                console.error("Getting error while merging reports: ", err.message)
        
            })
            .finally(() => {
                console.log("Test Run Completed");
               // process.exit()
              })
    })   
    .catch(err => {
        generateReport()
        console.error(err.message)
        process.exit(1)
      })
}

//get current timestamp
function getTimeStamp() {
    var now = new moment().format('DD-MM-YYYY--HH_mm_ss')
    return now
}

//generate unified report from sourecReport.files directory and create a unified report and store it in finalReport.reportDir location
function generateReport() {
    return  merge(sourceReport).then(report => {marge.create(report, finalReport)});

  }