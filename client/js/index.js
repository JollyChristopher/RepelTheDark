var client = new Colyseus.Client('ws://localhost:2567');

client.joinOrCreate("my_room").then(room => {
    console.log(room.sessionId, "joined", room.name);
}).catch(e => {
    console.log("JOIN ERROR", e);
});