const proxyquire = require('proxyquire').noCallThru();
const sinon = require('sinon');
const chai = require('chai');
chai.should();

describe('MyRoom', function() {
    it('onCreate should set values correctly', function() {
        const includes = {
            'colyseus': {
                Room: class Room { 
                    constructor() {
                        this.setState = sinon.fake();
                    }

                    onMessage(type, callback) {
                        type.should.equal('type');
                        callback.should.be.a('function');
                        callback('someClient', 'someMessage');
                    }
                }
            },
            './schema/MyRoomState': {
                MyRoomState: class MyRoomState { }
            }
        };
        const MyRoom = proxyquire('../../../src/rooms/MyRoom.js', includes).MyRoom;
        let room = new MyRoom();
        room.onCreate();
        sinon.assert.calledOnce(room.setState);
    });
    it('onJoin should set values correctly', function() {
        const includes = {
            'colyseus': {
                Room: class Room { }
            },
            './schema/MyRoomState': {
                MyRoomState: sinon.fake()
            }
        };
        const MyRoom = proxyquire('../../../src/rooms/MyRoom.js', includes).MyRoom;
        let room = new MyRoom();
        room.onJoin();
    });
    it('onLeave should set values correctly', function() {
        const includes = {
            'colyseus': {
                Room: class Room { }
            },
            './schema/MyRoomState': {
                MyRoomState: sinon.fake()
            }
        };
        const MyRoom = proxyquire('../../../src/rooms/MyRoom.js', includes).MyRoom;
        let room = new MyRoom();
        room.onLeave();
    });
    it('onDispose should set values correctly', function() {
        const includes = {
            'colyseus': {
                Room: class Room { }
            },
            './schema/MyRoomState': {
                MyRoomState: sinon.fake()
            }
        };
        const MyRoom = proxyquire('../../../src/rooms/MyRoom.js', includes).MyRoom;
        let room = new MyRoom();
        room.onDispose();
    });
});