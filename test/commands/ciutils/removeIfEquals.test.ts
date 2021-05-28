import { expect, test } from '@salesforce/command/lib/test';
import * as mockfs from 'mock-fs';
import * as path from 'path';

describe('Test Error if no Path flow', () => {
  test
    .stderr()
    .command(['ciutils:flow:removeIfEqual'])
    .it('ciutils:flow:removeIfEquals', ctx => {
      expect(ctx.stderr).to.contains('retrieved and toUpload paths are mandatory');
    });
});

describe('Test Success, Delete file flow', () => {
  const mockFolders = () => {
    const mockfsConf = {
      'package.json': mockfs.load(path.resolve(__dirname, '../../../package.json')),
      'tsconfig.json': mockfs.load(path.resolve(__dirname, '../../../tsconfig.json')),
      src: mockfs.load(path.resolve(__dirname, '../../../src')),
      messages: mockfs.load(path.resolve(__dirname, '../../../messages')),
      test: mockfs.load(path.resolve(__dirname, '../../../test')),
      node_modules: mockfs.load(path.resolve(__dirname, '../../../node_modules')),
      // mocked folders and files go here e.g.
      '/path/to/fake/dir': {
        'Test1.flow-meta.xml': '<?xml version="1.0" encoding="UTF-8"?>\n <Flow xmlns="http://soap.sforce.com/2006/04/metadata">\n <apiVersion>50.0</apiVersion>\n <assignments>'
      },
      '/path/to/fake/dir2': {
        'Test1.flow-meta.xml': '  <?xml version="1.0" encoding="UTF-8"?>\n <Flow xmlns="http://soap.sforce.com/2006/04/metadata">\n <apiVersion>50.0</apiVersion>\n <assignments>'
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
    .command(['ciutils:flow:removeIfEqual', '-r', '/path/to/fake/dir', '-u', '/path/to/fake/dir2'])
    .it('ciutils:flow:removeIfEqual -r /path/to/fake/dir -u /path/to/fake/dir2', ctx => {
      expect(ctx.stdout).to.contains('Files deleted: Test1.flow-meta.xml');
    });

});
describe('Test Success, Do NOT delete file flow', () => {
  const mockFolders = () => {
    const mockfsConf = {
      'package.json': mockfs.load(path.resolve(__dirname, '../../../package.json')),
      'tsconfig.json': mockfs.load(path.resolve(__dirname, '../../../tsconfig.json')),
      src: mockfs.load(path.resolve(__dirname, '../../../src')),
      messages: mockfs.load(path.resolve(__dirname, '../../../messages')),
      test: mockfs.load(path.resolve(__dirname, '../../../test')),
      node_modules: mockfs.load(path.resolve(__dirname, '../../../node_modules')),
      // mocked folders and files go here e.g.
      '/path/to/fake/dir': {
        'Test1.flow-meta.xml': '<?xml version="1.0" encoding="UTF-8"?>\n <Flow xmlns="http://soap.sforce.com/2006/04/metadata">\n <apiVersion>50.0</apiVersion>\n <assignments>'
      },
      '/path/to/fake/dir2': {
        'Test1.flow-meta.xml': '  <?xml version="1.0" encoding="UTF-8"?>\n <Flow xmlns="http://soap.sforce.com/2006/04/metadata">\n <apiVersion>51.0</apiVersion>\n <assignments>'
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
    .command(['ciutils:flow:removeIfEqual', '-r', '/path/to/fake/dir', '-u', '/path/to/fake/dir2'])
    .it('ciutils:flow:removeIfEqual -r /path/to/fake/dir -u /path/to/fake/dir2', ctx => {
      expect(ctx.stdout).to.contains('No files deleted');
    });
});

describe('Test Error if no Path entitlement', () => {
  test
    .stderr()
    .command(['ciutils:entitlement:removeIfEqual'])
    .it('ciutils:entitlement:removeIfEquals', ctx => {
      expect(ctx.stderr).to.contains('retrieved and toUpload paths are mandatory');
    });
});

describe('Test Success, Delete file entitlement', () => {
  const mockFolders = () => {
    const mockfsConf = {
      'package.json': mockfs.load(path.resolve(__dirname, '../../../package.json')),
      'tsconfig.json': mockfs.load(path.resolve(__dirname, '../../../tsconfig.json')),
      src: mockfs.load(path.resolve(__dirname, '../../../src')),
      messages: mockfs.load(path.resolve(__dirname, '../../../messages')),
      test: mockfs.load(path.resolve(__dirname, '../../../test')),
      node_modules: mockfs.load(path.resolve(__dirname, '../../../node_modules')),
      // mocked folders and files go here e.g.
      '/path/to/fake/dir': {
        'entitlement.xml': '<?xml version="1.0" encoding="UTF-8"?>\n <Flow xmlns="http://soap.sforce.com/2006/04/metadata">\n <apiVersion>50.0</apiVersion>\n <assignments>'
      },
      '/path/to/fake/dir2': {
        'entitlement.xml': 'dwqdiygwqiydgiqwydgiqywgdiyqwgidgqiywgdyiq'
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
    .command(['ciutils:entitlement:removeIfEqual', '-r', '/path/to/fake/dir', '-u', '/path/to/fake/dir2'])
    .it('ciutils:entitlement:removeIfEqual -r /path/to/fake/dir -u /path/to/fake/dir2', ctx => {
      expect(ctx.stdout).to.contains('Files deleted: entitlement.xml');
    });


});
describe('Test Success, Do NOT delete file flow', () => {
  const mockFolders = () => {
    const mockfsConf = {
      'package.json': mockfs.load(path.resolve(__dirname, '../../../package.json')),
      'tsconfig.json': mockfs.load(path.resolve(__dirname, '../../../tsconfig.json')),
      src: mockfs.load(path.resolve(__dirname, '../../../src')),
      messages: mockfs.load(path.resolve(__dirname, '../../../messages')),
      test: mockfs.load(path.resolve(__dirname, '../../../test')),
      node_modules: mockfs.load(path.resolve(__dirname, '../../../node_modules')),
      // mocked folders and files go here e.g.
      '/path/to/fake/dir': {
        'entitlement1.xml': '<?xml version="1.0" encoding="UTF-8"?>\n <Flow xmlns="http://soap.sforce.com/2006/04/metadata">\n <apiVersion>50.0</apiVersion>\n <assignments>'
      },
      '/path/to/fake/dir2': {
        'entitlement2.xml': '  <?xml version="1.0" encoding="UTF-8"?>\n <Flow xmlns="http://soap.sforce.com/2006/04/metadata">\n <apiVersion>51.0</apiVersion>\n <assignments>'
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
    .command(['ciutils:entitlement:removeIfEqual', '-r', '/path/to/fake/dir', '-u', '/path/to/fake/dir2'])
    .it('ciutils:entitlement:removeIfEqual -r /path/to/fake/dir -u /path/to/fake/dir2', ctx => {
      expect(ctx.stdout).to.contains('No files deleted');
    });
});
