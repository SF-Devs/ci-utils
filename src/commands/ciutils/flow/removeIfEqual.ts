import { flags, SfdxCommand } from '@salesforce/command';
import { Messages, SfdxError } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('sfciutils', 'removeIfEqual');

export default class Org extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');

  public static examples = [
    `$ sfdx ciutils:entitlement:removeIfEqual --retrieved --toupload
  Class1,Class2,Class3
  `
  ];

  public static args = [{name: 'file'}];

  protected static flagsConfig = {
    // flag with a value (-n, --name=VALUE)
    retrieved: flags.string({char: 'r', description: messages.getMessage('retrieved')}),
    toupload: flags.string({char: 'u', description: messages.getMessage('toupload')})
  };

  // Comment this out if your command does not require an org username
  protected static requiresUsername = false;

  // Comment this out if your command does not support a hub org username
  protected static supportsDevhubUsername = false;

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = false;

  public async run(): Promise<AnyJson> {
    const deletedFiles = new Array();
    // validate mandatory input
    if (null == this.flags.retrieved || null == this.flags.toupload) {
      throw new SfdxError('retrieved and toUpload paths are mandatory');
    }
    const fs = require('fs');
    const path = require('path');
    // Checks if folder exists
    if (false === fs.existsSync(this.flags.retrieved) || false === fs.existsSync(this.flags.toupload)) {
      throw new SfdxError('Path does not exist or invalid');
    }
    // If folders are the same error out
    if (this.flags.retrieved === this.flags.toupload) {
      throw new SfdxError('Folders to compare cannot be the same.');
    }
    // get all classes on the to Upload that exists on the retrieved folder
    const files = fs.readdirSync(this.flags.toupload).filter(file => {
      return file.endsWith('.flow-meta.xml') && fs.existsSync(path.join(this.flags.retrieved, file));
    });

    // compares the contents of the existing files, and deletes the file from the ->to upload folder.
    files.forEach(file => {
      const file1 = fs.readFileSync(path.join(this.flags.toupload, file)).toString().replace(/\s+/g, '');
      const file2 = fs.readFileSync(path.join(this.flags.retrieved, file)).toString().replace(/\s+/g, '');
      if (file1 === file2) {
        deletedFiles.push(file);
        fs.unlinkSync(path.join(this.flags.toupload, file));
      }
    });
    if (deletedFiles.length === 0) {
      this.ux.log('No files deleted');
      return 'No files deleted';
    }
    // tslint:disable-next-line:no-unused-expression
    this.ux.log('Files deleted: ' + deletedFiles);
    return deletedFiles;
  }
}
