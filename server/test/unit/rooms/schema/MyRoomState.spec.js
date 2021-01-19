const proxyquire = require('proxyquire').noCallThru();
const sinon = require('sinon');

describe('MyRoomState', function() {
    it('should define types and export', function() {
        const includes = {
            '@colyseus/schema': {
                Schema: class Schema { },
                defineTypes: sinon.fake()
            }
        };
        const MyRoomState = proxyquire('../../../../src/rooms/schema/MyRoomState.js', includes).MyRoomState;
        sinon.assert.calledOnce(includes['@colyseus/schema'].defineTypes);
        sinon.assert.calledWith(includes['@colyseus/schema'].defineTypes, sinon.match.func, {
            mySynchronizedProperty: 'string'
        });
    });
});