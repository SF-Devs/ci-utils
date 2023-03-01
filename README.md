sfciutils
=========

Salesforce DX plugin for centralising utilities for CI/CD

[![Version](https://img.shields.io/npm/v/sfciutils.svg)](https://npmjs.org/package/sfciutils)
[![CircleCI](https://circleci.com/gh/https://github.com/SF-Devs/ci-utils/SF-Devs/tree/master.svg?style=shield)](https://circleci.com/gh/https://github.com/SF-Devs/ci-utils/SF-Devs/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/https://github.com/SF-Devs/ci-utils/SF-Devs?branch=master&svg=true)](https://ci.appveyor.com/project/heroku/SF-Devs/branch/master)
[![Greenkeeper](https://badges.greenkeeper.io/https://github.com/SF-Devs/ci-utils/SF-Devs.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/https://github.com/SF-Devs/ci-utils/SF-Devs/badge.svg)](https://snyk.io/test/github/https://github.com/SF-Devs/ci-utils/SF-Devs)
[![Downloads/week](https://img.shields.io/npm/dw/sfciutils.svg)](https://npmjs.org/package/sfciutils)
[![License](https://img.shields.io/npm/l/sfciutils.svg)](https://github.com/https://github.com/SF-Devs/ci-utils/SF-Devs/blob/master/package.json)

<!-- toc -->
* [Debugging your plugin](#debugging-your-plugin)
<!-- tocstop -->
<!-- install -->
<!-- usage -->
```sh-session
$ npm install -g sfciutils
$ sfdx COMMAND
running command...
$ sfdx (--version)
sfciutils/1.3.1 darwin-x64 node-v19.3.0
$ sfdx --help [COMMAND]
USAGE
  $ sfdx COMMAND
...
```
<!-- usagestop -->
<!-- commands -->
* [`sfdx ciutils:deployment:reportOnDeployment [-d <id>] [-f] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-ciutilsdeploymentreportondeployment--d-id--f--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx ciutils:entitlement:removeIfEqual [-r <string>] [-u <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-ciutilsentitlementremoveifequal--r-string--u-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx ciutils:flow:removeIfEqual [-r <string>] [-u <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-ciutilsflowremoveifequal--r-string--u-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx ciutils:profiles:split -i <string> -o <string> [-d] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-ciutilsprofilessplit--i-string--o-string--d---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx ciutils:testclass:generateList [-p <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-ciutilstestclassgeneratelist--p-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)

## `sfdx ciutils:deployment:reportOnDeployment [-d <id>] [-f] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Generates a report based on a deployment ID.

```
USAGE
  $ sfdx ciutils:deployment:reportOnDeployment [-d <id>] [-f] [-u <string>] [--apiversion <string>] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -d, --deploymentid=<value>                                                        The ID of the deployment to reprort
                                                                                    on
  -f, --untildone                                                                   will print status updates every 30s
                                                                                    until the deployment is finished
  -u, --targetusername=<value>                                                      username or alias for the target
                                                                                    org; overrides default target org
  --apiversion=<value>                                                              override the api version used for
                                                                                    api requests made by this command
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

DESCRIPTION
  Generates a report based on a deployment ID.

EXAMPLES
  $ sfdx ciutils:deployment:reportOnDeployment --deploymentId [Id of a deployment]
```

_See code: [src/commands/ciutils/deployment/reportOnDeployment.ts](https://github.com/SF-Devs/ci-utils/SF-Devs/blob/v1.3.1/src/commands/ciutils/deployment/reportOnDeployment.ts)_

## `sfdx ciutils:entitlement:removeIfEqual [-r <string>] [-u <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

removes components from the deployment folder in case they already exist and are the same.

```
USAGE
  $ sfdx ciutils:entitlement:removeIfEqual [-r <string>] [-u <string>] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -r, --retrieved=<value>                                                           path to component retrieved from
                                                                                    destination org for comparison
  -u, --toupload=<value>                                                            path to component that are going to
                                                                                    be deployed
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

DESCRIPTION
  removes components from the deployment folder in case they already exist and are the same.

EXAMPLES
  $ sfdx ciutils:entitlement:removeIfEqual --retrieved --toupload
    Class1,Class2,Class3
```

_See code: [src/commands/ciutils/entitlement/removeIfEqual.ts](https://github.com/SF-Devs/ci-utils/SF-Devs/blob/v1.3.1/src/commands/ciutils/entitlement/removeIfEqual.ts)_

## `sfdx ciutils:flow:removeIfEqual [-r <string>] [-u <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

removes components from the deployment folder in case they already exist and are the same.

```
USAGE
  $ sfdx ciutils:flow:removeIfEqual [-r <string>] [-u <string>] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -r, --retrieved=<value>                                                           path to component retrieved from
                                                                                    destination org for comparison
  -u, --toupload=<value>                                                            path to component that are going to
                                                                                    be deployed
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

DESCRIPTION
  removes components from the deployment folder in case they already exist and are the same.

EXAMPLES
  $ sfdx ciutils:entitlement:removeIfEqual --retrieved --toupload
    Class1,Class2,Class3
```

_See code: [src/commands/ciutils/flow/removeIfEqual.ts](https://github.com/SF-Devs/ci-utils/SF-Devs/blob/v1.3.1/src/commands/ciutils/flow/removeIfEqual.ts)_

## `sfdx ciutils:profiles:split -i <string> -o <string> [-d] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Split profiles into smaller parts.

```
USAGE
  $ sfdx ciutils:profiles:split -i <string> -o <string> [-d] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -d, --delete                                                                      Delete the existing profiles once
                                                                                    converted?
  -i, --input=<value>                                                               (required) [default:
                                                                                    force-app/main/default/profiles] the
                                                                                    input directory where the full
                                                                                    profiles exist.
  -o, --output=<value>                                                              (required) [default:
                                                                                    force-app/main/default/profiles] the
                                                                                    output directory to store the
                                                                                    chunked profiles.
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

DESCRIPTION
  Split profiles into smaller parts.

EXAMPLES
          sfdx metadata:profiles:split -i force-app/main/default/profiles -o force-app/main/default/test
          //Splits profiles located in specified input dir and copies them into the output dir.
```

_See code: [src/commands/ciutils/profiles/split.ts](https://github.com/SF-Devs/ci-utils/SF-Devs/blob/v1.3.1/src/commands/ciutils/profiles/split.ts)_

## `sfdx ciutils:testclass:generateList [-p <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

generates a comma separated string with all the names of test classes in the referred folder

```
USAGE
  $ sfdx ciutils:testclass:generateList [-p <string>] [--json] [--loglevel
    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

FLAGS
  -p, --path=<value>                                                                path to Apex classes
  --json                                                                            format output as json
  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

DESCRIPTION
  generates a comma separated string with all the names of test classes in the referred folder

EXAMPLES
  $ sfdx ciutils:testclass:generateList --path
    Class1,Class2,Class3
```

_See code: [src/commands/ciutils/testclass/generateList.ts](https://github.com/SF-Devs/ci-utils/SF-Devs/blob/v1.3.1/src/commands/ciutils/testclass/generateList.ts)_
<!-- commandsstop -->
<!-- debugging-your-plugin -->
# Debugging your plugin
We recommend using the Visual Studio Code (VS Code) IDE for your plugin development. Included in the `.vscode` directory of this plugin is a `launch.json` config file, which allows you to attach a debugger to the node process when running your commands.

To debug the `hello:org` command: 
1. Start the inspector
  
If you linked your plugin to the sfdx cli, call your command with the `dev-suspend` switch: 
```sh-session
$ sfdx hello:org -u myOrg@example.com --dev-suspend
```
  
Alternatively, to call your command using the `bin/run` script, set the `NODE_OPTIONS` environment variable to `--inspect-brk` when starting the debugger:
```sh-session
$ NODE_OPTIONS=--inspect-brk bin/run hello:org -u myOrg@example.com
```

2. Set some breakpoints in your command code
3. Click on the Debug icon in the Activity Bar on the side of VS Code to open up the Debug view.
4. In the upper left hand corner of VS Code, verify that the "Attach to Remote" launch configuration has been chosen.
5. Hit the green play button to the left of the "Attach to Remote" launch configuration window. The debugger should now be suspended on the first line of the program. 
6. Hit the green play button at the top middle of VS Code (this play button will be to the right of the play button that you clicked in step #5).
<br><img src=".images/vscodeScreenshot.png" width="480" height="278"><br>
Congrats, you are debugging!
