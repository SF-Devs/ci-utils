/* tslint:disable */
import {flags, SfdxCommand} from '@salesforce/command';
import {SfdxError} from '@salesforce/core';
import fs = require('fs-extra');
import convert = require('xml-js');
import path = require('path');
import config = require('../../../shared/config.json');
import chalk from 'chalk';
import { AnyJson } from '@salesforce/ts-types';

function createModel(key, value) {
  const data = {
    _declaration: {
      _attributes: {
        version: '1.0',
        encoding: 'UTF-8'
      }
    },
    Profile: {
      _attributes: {
        xmlns: 'http://soap.sforce.com/2006/04/metadata'
      }
    }
  };

  data.Profile[key] = value;
  return data;
}

export default class Split extends SfdxCommand {
  public static description = 'Split profiles into smaller parts.';

  public static examples = [`
        sfdx metadata:profiles:split -i force-app/main/default/profiles -o force-app/main/default/test
        //Splits profiles located in specified input dir and copies them into the output dir.
    `];

  protected static flagsConfig = {
    input: flags.string({char: 'i', default: 'force-app/main/default/profiles', required: true, description: 'the input directory where the full profiles exist.'}),
    output: flags.string({char: 'o', default: 'force-app/main/default/profiles', required: true, description: 'the output directory to store the chunked profiles.'}),
    delete: flags.boolean({char: 'd', default: false, description: 'Delete the existing profiles once converted?'})
  };

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = false;

  public async split(inputDir: string, outputDir: string, deleteProfile: boolean): Promise<any> {
    try {
      const root = path.resolve(inputDir);

      const location = path.resolve(outputDir);
      await fs.ensureDir(location);
      const fileNames = await fs.readdir(root);
      const profiles = fileNames.filter((fileName)=> {
        return fileName.indexOf('.profile') !== -1;
      });
      //Invalid profiles
      if (profiles.length==0){
        throw new SfdxError('No profiles on designated folder');
      }

      for (const fileName of fileNames) {
          this.ux.log(chalk.bold(chalk.black(('Splitting profile: ' + fileName))));
          const dirRoot = location + '/' + fileName.replace('.profile', '');
          //Creates and ensures a folder with the name of the profile exists without the extension
          await fs.ensureDir(dirRoot);
          //Transforms xml to json
          const xml = await fs.readFile(root + '/' + fileName);
          const stream = convert.xml2js(xml.toString(), config.jsonExport);

          //If not in the reference meta tag in config file, go to next one.
          for (const metatag of Object.values(config.profiles.metaTags)) {
            if (stream['Profile'][metatag] === undefined) {
              continue;
            }
            const model = createModel(metatag, stream['Profile'][metatag]);
            const itemRoot = dirRoot + '/' + metatag;
            await fs.ensureDir(itemRoot);
            await fs.writeFile(
              itemRoot + '/' + metatag + '-meta.xml',
              convert.json2xml(JSON.stringify(model), config.xmlExport)
            );
          }

          for (const metadata of Object.keys(config.profiles.tags)) {
            const itemRoot = dirRoot + '/' + metadata;
            await fs.ensureDir(itemRoot);

            const targetName = config.profiles.tags[metadata].nameTag;

            if (stream['Profile'][metadata] === undefined) {
              continue;
            }

            if (Array.isArray(stream['Profile'][metadata])) {
              if (targetName === '_self') {
                const model = createModel(metadata, stream['Profile'][metadata]);

                await fs.writeFile(
                  itemRoot + '/' + metadata + '-meta.xml',
                  convert.json2xml(JSON.stringify(model), config.xmlExport)
                );
              } else {
                //SHOULD NOT BE A FOR HERE!!!
                // for (const item of stream['Profile'][metadata]) {
                const item = stream['Profile'][metadata];
                let model = createModel(metadata,item );
                await fs.writeFile(
                  itemRoot + '/' + metadata + '-meta.xml',
                  convert.json2xml(JSON.stringify(model), config.xmlExport)
                );
              }
              //}
            } else {
              const item = stream['Profile'][metadata];
              const model = createModel(metadata, item);
              let newFileName = '';

              if (targetName === '_self') {
                newFileName = metadata + '-meta.xml';
              } else {
                newFileName = stream['Profile'][metadata][targetName]._text + '-meta.xml';
              }

              await fs.writeFile(
                itemRoot + '/' + newFileName,
                convert.json2xml(JSON.stringify(model), config.xmlExport)
              );
            }
          }
          if (deleteProfile === true) {
            await fs.remove(root + '/' + fileName);
          }


      }
    } catch(ex) {
      this.ux.error(chalk.bold(chalk.red(ex)));
      return 1;
    }

    return 0;
  }

  public async run(): Promise<AnyJson> {
    const inputDir = this.flags.input;
    const outputDir = this.flags.output;
    const deleteProfile = this.flags.delete;

    await this.split(inputDir, outputDir, deleteProfile);

    // Return an object to be displayed with --json
    return {};
  }
}
