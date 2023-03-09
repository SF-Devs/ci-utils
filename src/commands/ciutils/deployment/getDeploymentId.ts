import { flags, SfdxCommand } from '@salesforce/command';
import { Messages, SfdxError } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);
// tslint:disable-next-line:no-var-requires
// tslint:disable-next-line:no-var-requires

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('sfciutils', 'getDeploymentId');
const fs = require('fs');

export default class Org extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');

  public static examples = [
    '$ sfdx ciutils:deployment:getDeloymentId --path [path to JSON result from sfdx force:source:deploy]  '
  ];

  public static args = [];
  protected static flagsConfig = {
    // flag with a value (-n, --name=VALUE)
    path: flags.string({char: 'p', description: messages.getMessage('pathFlag')}),
  };

  // Comment this out if your command does not require an org username
  protected static requiresUsername = false;

  // Comment this out if your command does not support a hub org username
  protected static supportsDevhubUsername = false;

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = false;
  public deploymentStatus;
  public async run(): Promise<AnyJson> {
    // validate mandatory input

      const response = JSON.parse(fs.readFileSync( this.flags.path));
        if (response.status !== 0){
          throw new SfdxError("Response Status not 0.: ST:\n "+response);
        }

      this.ux.log(response.result.id);
      return(0);
  }
}
