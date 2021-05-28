import { flags, SfdxCommand } from '@salesforce/command';
import { Messages, SfdxError } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('sfciutils', 'generateTestClassNames');

export default class Org extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');

  public static examples = [
    `$ sfdx ciutils:testclass:generateList --path
  Class1,Class2,Class3
  `
  ];

  public static args = [{name: 'file'}];

  protected static flagsConfig = {
    // flag with a value (-n, --name=VALUE)
    path: flags.string({char: 'p', description: messages.getMessage('pathFlagDescription')})
  };

  // Comment this out if your command does not require an org username
  protected static requiresUsername = false;

  // Comment this out if your command does not support a hub org username
  protected static supportsDevhubUsername = false;

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = false;

  public async run(): Promise<AnyJson> {
    // validate mandatory input
    if (null == this.flags.path) {
      throw new SfdxError('Path is mandatory');
    }
    const path = this.flags.path;
    const fs = require('fs');
    // Checks if folder exists
    if (false === fs.existsSync(path)) {
      throw new SfdxError('Path does not exist or invalid');
    }
    // get all classes on the folder
    const files = fs.readdirSync(path).filter(file => {
      return file.endsWith('.cls');
    });
    // checks if the files contains the @IsTest string
    const testFiles = files.filter(file => {
      const data = fs.readFileSync(path + '/' + file).toString().toLowerCase();
      return (data.includes('@istest'));
    });

    const returnString = testFiles.join().replaceAll('.cls','');
    this.ux.log(returnString);
    return testFiles;
  }
}
