import { flags, SfdxCommand } from '@salesforce/command';
import { Messages, SfdxError } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);
// tslint:disable-next-line:no-var-requires
const cliProgress = require('cli-progress');
// tslint:disable-next-line:no-var-requires
const table = require('cli-table3');

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('sfciutils', 'reportOnDeployments');

export default class Org extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');

  public static examples = [
    '$ sfdx ciutils:deployment:reportOnDeployment --deploymentId [Id of a deployment]  '
  ];

  public static args = [{name: 'file'}];
  protected static flagsConfig = {
    // flag with a value (-n, --name=VALUE)
    deploymentid: flags.id({char: 'd', description: messages.getMessage('deploymentIdFlag')}),
    untildone: flags.boolean({char: 'f', description: messages.getMessage('untilDoneFlag')})
  };

  // Comment this out if your command does not require an org username
  protected static requiresUsername = true;

  // Comment this out if your command does not support a hub org username
  protected static supportsDevhubUsername = false;

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = false;
  public deploymentStatus;
  public async run(): Promise<AnyJson> {
    // validate mandatory input
    if (null == this.flags.deploymentid) {
      throw new SfdxError('Deployment ID is mandatory');
    }
    await this.displayHeader();
    const untilDone = this.flags.untildone;
    const conn = this.org.getConnection();
    this.deploymentStatus = await conn.request('/metadata/deployRequest/' + this.flags.deploymentid + '?includeDetails=true') as object;
    if (untilDone === true) {
      await this.iterateUntilDone(this.deploymentStatus, conn);
    }

    this.displayWarnings();

    if (this.deploymentStatus.deployResult.status === 'Succeeded') {
      await this.reportSuccess();
      this.exit();
    }
    if (this.deploymentStatus.deployResult.numberComponentErrors > 0) {
      await this.displayComponentError();
    }
    if (this.deploymentStatus.deployResult.numberTestErrors > 0) {
      await this.displayTestErrors();
    }
    throw new SfdxError('The deployment failed successfully');
  }
  public async displayHeader() {
    this.ux.log( '*** Deploying ***');
    this.ux.log( '\n\n\Job ID | ' + this.flags.deploymentid + '\n\n' );
  }
  public async displayTestErrors() {
    this.ux.log( '\n\n\n==========================================================================================================');
    this.ux.log( 'FAILURE: Test Execution Errors');
    this.ux.log( '==========================================================================================================');
    const testErrors = this.deploymentStatus.deployResult.details.runTestResult.failures;
    let t1 = new table({
      head: ['Class Name', 'Method Name', 'Error Message'],
      width: 200,
      colWidths: [40, 40, 120 ],
      wordWrap: true
    });

    const errorMap = testErrors.map(testError => ([testError.name, testError.methodName, testError.message]));
    t1.push(...errorMap);
    this.ux.log(t1.toString());

  }

  public async displayComponentError() {
    this.ux.log( '\n\n\n==========================================================================================================');
    this.ux.log( 'FAILURE: Deployment Component Errors');
    this.ux.log( '==========================================================================================================');
    const componentErrors = this.deploymentStatus.deployResult.details.componentFailures;
    let t1 = new table({
      head: ['Api Name', 'Type', 'Line', 'Column', 'Error Message'],
      width: 200,
      colWidths: [60, 20, 6, 8, 100 ],
      wordWrap: true
    });

    const errorMap = componentErrors.map(compError => ([compError.fileName, compError.componentType,
    compError.lineNumber || 'N/A', compError.columnNumber || 'N/A', compError.problem]));
    t1.push(...errorMap);
    this.ux.log(t1.toString());

  }
public async reportSuccess() {
  this.ux.log( '\n\n\n==========================================================================================================');
  this.ux.log( 'SUCCESS: Deployment Completed Awesomely');
  this.ux.log( '==========================================================================================================');

  }

  public async iterateUntilDone(deploymentResult, conn) {
    const multibar = new cliProgress.MultiBar({
      format: 'Deployment Progress | {bar} | {percentage}% || {value}/{total} {filename}}',
      barCompleteChar: '\u2588',
      barIncompleteChar: '\u2591',
      hideCursor: true,
      noTTYOutput: true,
      notTTYSchedule: 10000

    });
    const b1 = await multibar.create(deploymentResult.deployResult.numberComponentsTotal, deploymentResult.deployResult.numberComponentsDeployed + deploymentResult.deployResult.numberComponentErrors, {filename: 'Components'} );
    const b2 = await multibar.create(deploymentResult.deployResult.numberTestsTotal, deploymentResult.deployResult.numberTestsCompleted + deploymentResult.deployResult.numberTestErrors, {filename: 'Test Methods'} );

    while (deploymentResult.deployResult.done !== true) {
      await this.wait(5000);
      deploymentResult = await conn.request('/metadata/deployRequest/' + this.flags.deploymentid + '?includeDetails=true') as object;
      b1.update(deploymentResult.deployResult.numberComponentsDeployed + deploymentResult.deployResult.numberComponentErrors, deploymentResult.deployResult.numberComponentsTotal);
      b2.update(deploymentResult.deployResult.numberTestsCompleted + deploymentResult.deployResult.numberTestErrors, deploymentResult.deployResult.numberTestsTotal);
    }
    multibar.stop();
  }
  public wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  private displayWarnings() {
    if (this.deploymentStatus.deployResult.details.runTestResult.codeCoverageWarnings.length > 0) {
      this.ux.log( '\n\n\n==========================================================================================================');
      this.ux.log( 'WARNING: ' + this.deploymentStatus.deployResult.details.runTestResult.codeCoverageWarnings[0].message);
      this.ux.log( '==========================================================================================================');
    }

    if (this.deploymentStatus.deployResult.details.runTestResult.flowCoverageWarnings > 0) {
      this.ux.log( '\n\n\n==========================================================================================================');
      this.ux.log( 'WARNING: ' + this.deploymentStatus.deployResult.details.runTestResult.flowCoverageWarnings[0].message);
      this.ux.log( '==========================================================================================================');
    }
  }
}
