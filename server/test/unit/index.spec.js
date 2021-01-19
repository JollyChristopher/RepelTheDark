const proxyquire = require('proxyquire').noCallThru();
const sinon = require('sinon');

describe('Server Injection', function () {
  afterEach(function () {
    delete process.env.PORT;
  });
  it('should load without port value', function () {
    const expressFake = {
      use: sinon.fake()
    };
    const serverFake = {
      define: sinon.fake(),
      listen: sinon.fake()
    };
    const includes = {
      http: {
        createServer: sinon.fake.returns('HTTP_SERVER')
      },
      express: sinon.fake.returns(expressFake),
      cors: sinon.fake.returns('CORS'),
      colyseus: {
        Server: sinon.fake.returns(serverFake)
      },
      '@colyseus/monitor': {
        monitor: sinon.fake.returns('MONITOR')
      },
      './rooms/MyRoom': {
        MyRoom: 'MY_ROOM'
      }
    };
    includes.express.json = sinon.fake.returns('EXPRESS_JSON');
    proxyquire('../../src/index.js', includes);
    sinon.assert.calledOnce(includes.express);
    sinon.assert.calledOnce(includes.cors);
    sinon.assert.calledOnce(includes.express.json);
    sinon.assert.calledThrice(expressFake.use);
    sinon.assert.calledWith(expressFake.use, 'CORS');
    sinon.assert.calledWith(expressFake.use, 'EXPRESS_JSON');
    sinon.assert.calledOnce(includes.http.createServer);
    sinon.assert.calledWith(includes.http.createServer, expressFake);
    sinon.assert.calledOnce(includes.colyseus.Server);
    sinon.assert.calledWith(includes.colyseus.Server, {
      server: 'HTTP_SERVER'
    });
    sinon.assert.calledOnce(serverFake.define);
    sinon.assert.calledWith(serverFake.define, 'my_room', 'MY_ROOM');
    sinon.assert.calledOnce(includes['@colyseus/monitor'].monitor);
    sinon.assert.calledWith(expressFake.use, '/colyseus', 'MONITOR');
    sinon.assert.calledOnce(serverFake.listen);
    sinon.assert.calledWith(serverFake.listen, 2567);
  });
  it('should load with port value', function () {
    process.env.PORT = 5000;
    const expressFake = {
      use: sinon.fake()
    };
    const serverFake = {
      define: sinon.fake(),
      listen: sinon.fake()
    };
    const includes = {
      http: {
        createServer: sinon.fake.returns('HTTP_SERVER')
      },
      express: sinon.fake.returns(expressFake),
      cors: sinon.fake.returns('CORS'),
      colyseus: {
        Server: sinon.fake.returns(serverFake)
      },
      '@colyseus/monitor': {
        monitor: sinon.fake.returns('MONITOR')
      },
      './rooms/MyRoom': {
        MyRoom: 'MY_ROOM'
      }
    };
    includes.express.json = sinon.fake.returns('EXPRESS_JSON');
    proxyquire('../../src/index.js', includes);
    sinon.assert.calledOnce(includes.express);
    sinon.assert.calledOnce(includes.cors);
    sinon.assert.calledOnce(includes.express.json);
    sinon.assert.calledThrice(expressFake.use);
    sinon.assert.calledWith(expressFake.use, 'CORS');
    sinon.assert.calledWith(expressFake.use, 'EXPRESS_JSON');
    sinon.assert.calledOnce(includes.http.createServer);
    sinon.assert.calledWith(includes.http.createServer, expressFake);
    sinon.assert.calledOnce(includes.colyseus.Server);
    sinon.assert.calledWith(includes.colyseus.Server, {
      server: 'HTTP_SERVER'
    });
    sinon.assert.calledOnce(serverFake.define);
    sinon.assert.calledWith(serverFake.define, 'my_room', 'MY_ROOM');
    sinon.assert.calledOnce(includes['@colyseus/monitor'].monitor);
    sinon.assert.calledWith(expressFake.use, '/colyseus', 'MONITOR');
    sinon.assert.calledOnce(serverFake.listen);
    sinon.assert.calledWith(serverFake.listen, '5000');
  });
});
