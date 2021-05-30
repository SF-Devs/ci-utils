import { expect, test } from '@salesforce/command/lib/test';
import * as mockfs from 'mock-fs';
import * as path from 'path';

describe('Test Error if no Path', () => {
  test
    .stderr()
    .command(['ciutils:testclass:generateList'])
    .it('ciutils:testclass:generateList', ctx => {
      expect(ctx.stderr).to.contains('Path is mandatory');
    });
});

describe('Test File Exists and Add Test2 to List', () => {
  const mockFolders = () => {
    const mockfsConf = {
      'package.json': mockfs.load(path.resolve(__dirname, '../../../package.json')),
      'tsconfig.json': mockfs.load(path.resolve(__dirname, '../../../tsconfig.json')),
      src: mockfs.load(path.resolve(__dirname, '../../../src')),
      test: mockfs.load(path.resolve(__dirname, '../../../test')),
      node_modules: mockfs.load(path.resolve(__dirname, '../../../node_modules')),

      // mocked folders and files go here e.g.
      '/path/to/fake/dir': {
        'Test1.cls': 'file content here',
        'Test1.cls.xml': 'file content here',
        'Test2.cls': '@isTest',
        'Test2.cls.xml': 'another nope'
      }

    };
    mockfs(mockfsConf, {createCwd: false});
  };
  test
    .do(() => {
      mockFolders();
    })
    .finally(() => {
      mockfs.restore();
    })
    .stdout()
    .command(['ciutils:testclass:generateList', '-p', '/path/to/fake/dir'])
    .it('ciutils:testclass:generateList -p /path/to/fake/dir', ctx => {
      expect(ctx.stdout).to.contains('Test2');
    });
});
