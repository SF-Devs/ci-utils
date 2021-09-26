sfciutils
=========

Salesforce DX plugin for centralising utilities for CI/CD

[![Version](https://img.shields.io/npm/v/sfciutils.svg)](https://npmjs.org/package/sfciutils)
[![codecov](https://codecov.io/gh/SF-Devs/ci-utils/branch/main/graph/badge.svg?token=QKN094UUDP)](https://codecov.io/gh/SF-Devs/ci-utils)
[![Known Vulnerabilities](https://snyk.io/test/github/SF-Devs/ci-utils/badge.svg)](https://snyk.io/test/github/SF-Devs/ci-utils)
[![Downloads/week](https://img.shields.io/npm/dw/sfciutils.svg)](https://npmjs.org/package/sfciutils)
[![License](https://img.shields.io/npm/l/sfciutils.svg)](https://github.com/SF-Devs/ci-utils/blob/master/package.json)

<!-- toc -->
<!-- tocstop -->
<!-- install -->
<!-- usage -->
```sh-session
$ sfdx plugins:install sfciutils
$ sfdx COMMAND
running command...
$ sfdx (-v|--version|version)
sfciutils/1.2.1 darwin-x64 node-v15.10.0
$ sfdx --help [COMMAND]
USAGE
  $ sfdx COMMAND
...
```
<!-- usagestop -->
<!-- commands -->
* [`sfdx ciutils:entitlement:removeIfEqual [-r <string>] [-u <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-ciutilsentitlementremoveifequal--r-string--u-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx ciutils:flow:removeIfEqual [-r <string>] [-u <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-ciutilsflowremoveifequal--r-string--u-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx ciutils:profiles:split -i <string> -o <string> [-d] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-ciutilsprofilessplit--i-string--o-string--d---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
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

_See code: [lib/commands/ciutils/entitlement/removeIfEqual.js](https://github.com/SF-Devs/ci-utils/blob/v1.2.1/lib/commands/ciutils/entitlement/removeIfEqual.js)_

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

_See code: [lib/commands/ciutils/flow/removeIfEqual.js](https://github.com/SF-Devs/ci-utils/blob/v1.2.1/lib/commands/ciutils/flow/removeIfEqual.js)_

## `sfdx ciutils:profiles:split -i <string> -o <string> [-d] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Split profiles into smaller parts.

```
Split profiles into smaller parts.

USAGE
  $ sfdx ciutils:profiles:split -i <string> -o <string> [-d] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -d, --delete                                                                      Delete the existing profiles once
                                                                                    converted?

  -i, --input=input                                                                 (required) [default:
                                                                                    force-app/main/default/profiles] the
                                                                                    input directory where the full
                                                                                    profiles exist.

  -o, --output=output                                                               (required) [default:
                                                                                    force-app/main/default/profiles] the
                                                                                    output directory to store the
                                                                                    chunked profiles.

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE

           sfdx metadata:profiles:split -i force-app/main/default/profiles -o force-app/main/default/test
           //Splits profiles located in specified input dir and copies them into the output dir.
```

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

_See code: [lib/commands/ciutils/testclass/generateList.js](https://github.com/SF-Devs/ci-utils/blob/v1.2.1/lib/commands/ciutils/testclass/generateList.js)_
<!-- commandsstop -->
