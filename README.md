sfciutils
=========

Salesforce DX plugin for centralising utilities for CI/CD

[![Version](https://img.shields.io/npm/v/sfciutils.svg)](https://npmjs.org/package/sfciutils)
[![CircleCI](https://circleci.com/gh/SF-Devs/ci-utils/tree/master.svg?style=shield)](https://circleci.com/gh/SF-Devs/ci-utils/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/SF-Devs/ci-utils?branch=master&svg=true)](https://ci.appveyor.com/project/heroku/ci-utils/branch/master)
[![Codecov](https://codecov.io/gh/SF-Devs/ci-utils/branch/master/graph/badge.svg)](https://codecov.io/gh/SF-Devs/ci-utils)
[![Greenkeeper](https://badges.greenkeeper.io/SF-Devs/ci-utils.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/SF-Devs/ci-utils/badge.svg)](https://snyk.io/test/github/SF-Devs/ci-utils)
[![Downloads/week](https://img.shields.io/npm/dw/sfciutils.svg)](https://npmjs.org/package/sfciutils)
[![License](https://img.shields.io/npm/l/sfciutils.svg)](https://github.com/SF-Devs/ci-utils/blob/master/package.json)

<!-- toc -->
* [Debugging your plugin](#debugging-your-plugin)
<!-- tocstop -->
<!-- install -->
<!-- usage -->
```sh-session
$ npm install -g sfciutils
$ sfdx COMMAND
running command...
$ sfdx (-v|--version|version)
sfciutils/1.1.0 darwin-x64 node-v15.10.0
$ sfdx --help [COMMAND]
USAGE
  $ sfdx COMMAND
...
```
<!-- usagestop -->
<!-- commands -->
* [`sfdx ciutils:entitlement:removeIfEqual [-r <string>] [-u <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-ciutilsentitlementremoveifequal--r-string--u-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx ciutils:flow:removeIfEqual [-r <string>] [-u <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-ciutilsflowremoveifequal--r-string--u-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx ciutils:testclass:generateList [-p <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-ciutilstestclassgeneratelist--p-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)

## `sfdx ciutils:entitlement:removeIfEqual [-r <string>] [-u <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

removes components from the deployment folder in case they already exist and are the same.

```
removes components from the deployment folder in case they already exist and are the same.

USAGE
  $ sfdx ciutils:entitlement:removeIfEqual [-r <string>] [-u <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -r, --retrieved=retrieved                                                         path to component retrieved from
                                                                                    destination org for comparison

  -u, --toupload=toupload                                                           path to component that are going to
                                                                                    be deployed

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  $ sfdx ciutils:entitlement:removeIfEqual --retrieved --toupload
     Class1,Class2,Class3
```

_See code: [lib/commands/ciutils/entitlement/removeIfEqual.js](https://github.com/SF-Devs/ci-utils/blob/v1.1.0/lib/commands/ciutils/entitlement/removeIfEqual.js)_

## `sfdx ciutils:flow:removeIfEqual [-r <string>] [-u <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

removes components from the deployment folder in case they already exist and are the same.

```
removes components from the deployment folder in case they already exist and are the same.

USAGE
  $ sfdx ciutils:flow:removeIfEqual [-r <string>] [-u <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -r, --retrieved=retrieved                                                         path to component retrieved from
                                                                                    destination org for comparison

  -u, --toupload=toupload                                                           path to component that are going to
                                                                                    be deployed

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  $ sfdx ciutils:entitlement:removeIfEqual --retrieved --toupload
     Class1,Class2,Class3
```

_See code: [lib/commands/ciutils/flow/removeIfEqual.js](https://github.com/SF-Devs/ci-utils/blob/v1.1.0/lib/commands/ciutils/flow/removeIfEqual.js)_

## `sfdx ciutils:testclass:generateList [-p <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

generates a comma separated string with all the names of test classes in the referred folder

```
generates a comma separated string with all the names of test classes in the referred folder

USAGE
  $ sfdx ciutils:testclass:generateList [-p <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -p, --path=path                                                                   path to Apex classes
  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  $ sfdx ciutils:testclass:generateList --path
     Class1,Class2,Class3
```

_See code: [lib/commands/ciutils/testclass/generateList.js](https://github.com/SF-Devs/ci-utils/blob/v1.1.0/lib/commands/ciutils/testclass/generateList.js)_
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
