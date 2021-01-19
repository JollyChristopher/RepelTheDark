const proxyquire = require('proxyquire').noCallThru();
const sinon = require('sinon');

describe('Main Loader', function () {
  it('createWindow should create a proper window', function () {
    const loadFake = sinon.fake();
    const browserFake = sinon.fake.returns({
      loadFile: loadFake
    });
    proxyquire('../../main.js', {
      electron: {
        app: {
          whenReady: sinon.fake.returns({
            then: function (func) {
              func();
            }
          }),
          on: sinon.fake()
        },
        BrowserWindow: browserFake
      }
    });
    sinon.assert.calledOnce(browserFake);
    sinon.assert.calledWith(browserFake, {
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true
      }
    });
    sinon.assert.calledOnce(loadFake);
    sinon.assert.calledWith(loadFake, 'dist/index.html');
  });
  describe('all closed', function () {
    let platform;
    beforeEach(function () {
      platform = process.platform;
    });
    afterEach(function () {
      Object.defineProperty(process, 'platform', {
        value: platform
      });
    });
    it('should handle: darwin', function () {
      Object.defineProperty(process, 'platform', {
        value: 'darwin'
      });
      const quitFake = sinon.fake();
      proxyquire('../../main.js', {
        electron: {
          app: {
            whenReady: sinon.fake.returns({
              then: sinon.fake()
            }),
            on: function (type, func) {
              if (type === 'window-all-closed') {
                func();
              }
            },
            quit: quitFake
          }
        }
      });
      sinon.assert.notCalled(quitFake);
    });
    it('should handle: not darwin', function () {
      Object.defineProperty(process, 'platform', {
        value: 'notdarwin'
      });
      const quitFake = sinon.fake();
      proxyquire('../../main.js', {
        electron: {
          app: {
            whenReady: sinon.fake.returns({
              then: sinon.fake()
            }),
            on: function (type, func) {
              if (type === 'window-all-closed') {
                func();
              }
            },
            quit: quitFake
          }
        }
      });
      sinon.assert.calledOnce(quitFake);
    });
  });
  it('should handle activate: no windows', function () {
    const loadFake = sinon.fake();
    const browserFake = sinon.fake.returns({
      loadFile: loadFake
    });
    browserFake.getAllWindows = sinon.fake.returns({
      length: 0
    });
    proxyquire('../../main.js', {
      electron: {
        app: {
          whenReady: sinon.fake.returns({
            then: sinon.fake()
          }),
          on: function (type, func) {
            if (type === 'activate') {
              func();
            }
          }
        },
        BrowserWindow: browserFake
      }
    });
    sinon.assert.calledOnce(browserFake.getAllWindows);
    sinon.assert.calledOnce(browserFake);
    sinon.assert.calledWith(browserFake, {
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true
      }
    });
    sinon.assert.calledOnce(loadFake);
    sinon.assert.calledWith(loadFake, 'dist/index.html');
  });
  it('should handle activate: a window', function () {
    const loadFake = sinon.fake();
    const browserFake = sinon.fake.returns({
      loadFile: loadFake
    });
    browserFake.getAllWindows = sinon.fake.returns({
      length: 1
    });
    proxyquire('../../main.js', {
      electron: {
        app: {
          whenReady: sinon.fake.returns({
            then: sinon.fake()
          }),
          on: function (type, func) {
            if (type === 'activate') {
              func();
            }
          }
        },
        BrowserWindow: browserFake
      }
    });
    sinon.assert.calledOnce(browserFake.getAllWindows);
    sinon.assert.notCalled(browserFake);
    sinon.assert.notCalled(loadFake);
  });
});
