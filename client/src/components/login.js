const m = require('mithril');

exports.popup = class LoginPopup {
  oninit() {
    this.l10n = {
      login: '--not--'
    };
    localize(this, {key: 'login'})
  }
  translated(key, value) {
    switch(key) {
      case 'login': this.l10n.login = value; m.redraw(); break;
    }
  }
  view() {
    return m('div', {class: 'ui tiny modal'}, [
      m('div', {class: 'header'}, this.l10n.login),
      m('div', {class: 'content'}, [
        'hello'
      ])
    ]);
  }
};
