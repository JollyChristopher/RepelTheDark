const Colyseus = require('colyseus.js');
const m = require('mithril');
const root = document.body;

m.render(root, [
  m('h1', 'Hello World!'),
  m('div', { class: 'ui animated button', tabIndex: 0 }, [
    m('div', { class: 'visible content' }, 'Next'),
    m('div', { class: 'hidden content' }, [
      m('i', { class: 'right arrow icon' })
    ])
  ])
]);

const client = new Colyseus.Client('ws://localhost:2567');

client.joinOrCreate('my_room').then(room => {
  console.log(room.sessionId, 'joined', room.name);
}).catch(e => {
  console.log('JOIN ERROR', e);
});
