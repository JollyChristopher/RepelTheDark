const proxyquire = require('proxyquire').noCallThru();
const sinon = require('sinon');
const chai = require('chai');
chai.should();

describe('MyRoomState', function () {
  it('should define types and export', function () {
    const includes = {
      '@colyseus/schema': {
        Schema: class Schema {
          constructor () {
            this.someValue = 5;
          }
        },
        defineTypes: sinon.fake()
      }
    };
    const MyRoomState = proxyquire('../../../../src/rooms/schema/MyRoomState.js', includes).MyRoomState;
    new MyRoomState().someValue.should.equal(5);
    sinon.assert.calledOnce(includes['@colyseus/schema'].defineTypes);
    sinon.assert.calledWith(includes['@colyseus/schema'].defineTypes, sinon.match.func, {
      mySynchronizedProperty: 'string'
    });
  });
});
