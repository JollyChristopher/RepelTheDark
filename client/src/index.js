const m = require('mithril');
const root = document.body;
const Logger = require('js-logger');
Logger.useDefaults(); // todo: way to set debug level
const logger = Logger.get('ui-index');
const MainMenu = require('./routes/menu_main.js').menu;
const OptionsMenu = require('./routes/menu_options.js').menu;
const FriendsMenu = require('./routes/menu_friends.js').menu;
const InvestigatorMenu = require('./routes/menu_investigator.js').menu;
const Game = require('./routes/game.js').menu;
const { localize, changeLanguage } = require('./data/localization.js');

m.route(root, '/main', {
  '/main': MainMenu,
  '/options': OptionsMenu,
  '/friends': FriendsMenu,
  '/investigator': InvestigatorMenu,
  '/game': Game
});

localize({
  translated: function (key, value) {
    logger.trace(`Translating '${key}' into '${value}'`);
    switch(key) {
      case 'app-title': document.title = value; break;
    }
  }
}, {key: 'app-title'});

let locale = m.route.param('locale');
if(locale) {
  changeLanguage(locale);
}