const React = require('react');
const ReactDOM = require('react-dom/server');

let ReactI18nfiy = null;

try {
  ReactI18nfiy = require('react-i18nify');
} catch (e) {
  ReactI18nfiy = require('../build/index.js');
}

const { I18n, Translate, Localize } = ReactI18nfiy;

I18n.setTranslations({
  en: {
    application: {
      title: 'Awesome app with i18n!',
      hello: 'Hello, %{name}!',
    },
    date: {
      long: 'MMMM Do, YYYY',
    },
    export: 'Export %{count} items',
    export_0: 'Nothing to export',
    export_1: 'Export %{count} item',
    two_lines: 'Line 1< sbr />Line 2',
  },
  nl: {
    application: {
      title: 'Toffe app met i18n!',
      hello: 'Hallo, %{name}!',
    },
    date: {
      long: 'D MMMM YYYY',
    },
    export: 'Exporteer %{count} dingen',
    export_0: 'Niks te exporteren',
    export_1: 'Exporteer %{count} ding',
    two_lines: 'Regel 1<br />Regel 2',
  },
});

I18n.setLocale('nl');

console.log(I18n.t('application.title'));
console.log(I18n.t('application.hello', { name: 'Aad' }));
console.log(I18n.t('export', { count: 0 }));
console.log(I18n.t('application.unknown_translation'));
console.log(I18n.t('application', { name: 'Aad' }));

console.log(I18n.l(1385856000000, { dateFormat: 'date.long' }));
console.log(I18n.l(Math.PI, { maximumFractionDigits: 2 }));

function myHandleMissingTranslation(key, replacements) {
  return `Missing translation: ${key}`;
}

I18n.setHandleMissingTranslation(myHandleMissingTranslation);

console.log(I18n.t('application.unknown_translation'));

function AwesomeComponent() {
  return (
    <div>
      <Translate value="application.title" />
      <br />
      <Translate value="application.title" style={{ fontWeight: 'bold', fontSize: '14px' }} />
      <br />
      <Translate value="application.hello" name="Aad" />
      <br />
      <Translate value="export" count={1} />
      <br />
      <Translate value="export" count={2} />
      <br />
      <Translate value="application.title" tag="h1" />
      <br />
      <Translate value="two_lines" dangerousHTML />
      <br />
      <Localize value="2015-09-03" dateFormat="date.long" />
      <br />
      <Localize value="2015-09-03" dateFormat="date.long" tag="div" />
      <br />
      <Localize
        value={10 / 3}
        options={{
          style: 'currency', currency: 'EUR', minimumFractionDigits: 2, maximumFractionDigits: 2,
        }}
      />
    </div>
  );
}

console.log(ReactDOM.renderToString(<AwesomeComponent />));
