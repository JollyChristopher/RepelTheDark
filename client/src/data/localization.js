const i18next = require('i18next/dist/cjs/i18next');
const HttpApi = require('i18next-http-backend');
const logger = require('js-logger').get('ui-localization');

let translators = [];
let initialized = false;
let nextLang;
i18next.use(HttpApi).init({
  backend: {
    loadPath: '/lang/{{lng}}.json'
  },
  supportedLngs: [
    'dev',
    'en-US'
  ],
  load: 'currentOnly',
  fallbackLng: 'en-US'
}).then(function() {
  logger.trace('i18next initialized, translate current translators');
  initialized = true;
  translators.forEach(translate);
  if(nextLang) {
    debugger
    _changeLanguage(nextLang);
    nextLang = null;
  }
});

const translate = function({translator, keys}) {
  keys.forEach(keyObj => {
    translator.translated(keyObj.key, i18next.t(keyObj.key, keyObj.options));
  });
};

const _changeLanguage = function(lang) {
  logger.trace(`changing language to ${lang}`);
  initialized = false;
  i18next.changeLanguage(lang).then(() => {
    logger.trace('i18next language changed, translate current translators');
    initialized = true;
    translators.forEach(translate);
    if(nextLang) {
      _changeLanguage(nextLang);
      nextLang = null;
    }
  });
}

exports.removeTranslator = function(translator) {
  logger.debug(`removing translator: ${translator}`);
  translators = translators.filter(tObj => tObj.translator === translator);
};

exports.changeLanguage = function(lang) {
  if(initialized) {
    _changeLanguage(lang);
  } else {
    nextLang = lang;
  }
};

exports.localize = function(translator, ...keys) {
  logger.trace(`adding a new translator: ${keys}`);
  translators.push({translator, keys});
  if(initialized) {
    logger.trace('i18next is already initialized');
    translate({translator, keys});
  }
};