const m = require('mithril');

exports.menu = {
  view: function () {
    return m('main', [
      m('h1', 'Hello World!'),
      m('div', { class: 'ui animated button', tabIndex: 0 }, [
        m('div', { class: 'visible content' }, 'Next'),
        m('div', { class: 'hidden content' }, [
          m('i', { class: 'right arrow icon' })
        ])
      ])
    ]);
  }
};
