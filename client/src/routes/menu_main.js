const m = require('mithril');
const Login = require('../components/login.js').popup;
const localize = require('../data/localization.js').localize;

exports.menu = class MainMenu {
  oninit() {
    this.l10n = {
      appTitle: '--not--'
    };
    localize(this, {key: 'app-title'})
  }
  translated(key, value) {
    switch(key) {
      case 'app-title': this.l10n.appTitle = value; m.redraw(); break;
    }
  }
  view() {
    return m('main', [
      m(Login),
      m('div', { 
        class: 'ui animated button', 
        tabIndex: 0, 
        onclick: () => {
          $('.ui.modal').modal('show');
        } 
      }, [
        m('div', { class: 'visible content' }, this.l10n.appTitle),
        m('div', { class: 'hidden content' }, [
          m('i', { class: 'right arrow icon' })
        ])
      ])
    ]);
  }
};
