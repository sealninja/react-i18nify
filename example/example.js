const React = require('react');
const ReactDOMServer = require('react-dom/server');
require('dayjs/locale/nl');
require('dayjs/locale/en');

let ReactI18nfiy = null;

try {
  ReactI18nfiy = require('react-i18nify');
} catch (e) {
  ReactI18nfiy = require('../cjs/index.js');
}

const { setTranslations, setLocale, setHandleMissingTranslation, setHandleFailedLocalization, translate, localize, Translate, Localize, I18n } = ReactI18nfiy;

setTranslations({
  en: {
    application: {
      title: 'Awesome app with i18n!',
      hello: 'Hello, %{name}!',
    },
    date: {
      long: 'MMMM do, yyyy',
    },
    export: 'Export %{count} items',
    export_0: 'Nothing to export',
    export_1: 'Export %{count} item',
  },
  nl: {
    application: {
      title: 'Toffe app met i18n!',
      hello: 'Hallo, %{name}!',
    },
    date: {
      long: 'd MMMM yyyy',
    },
    export: 'Exporteer %{count} dingen',
    export_0: 'Niks te exporteren',
    export_1: 'Exporteer %{count} ding',
  },
});

setLocale('nl');

console.log(translate('application.title'));
console.log(translate('application.hello', { name: 'Aad' }));
console.log(translate('export', { count: 0 }));
console.log(translate('application', { name: 'Aad' }));

console.log(localize(1385856000000, { dateFormat: 'date.long' }));
console.log(localize(Math.PI, { maximumFractionDigits: 2 }));
console.log(localize('huh', { dateFormat: 'date.long' }));

setHandleMissingTranslation((key, replacements, options, err) => `Missing translation: ${key}`);

console.log(translate('application.unknown_translation'));

setHandleFailedLocalization((value, options, err) => `Failed localization: ${value}`);

console.log(localize('huh', { dateFormat: 'date.long' }));

function AwesomeComponent() {
  return (
    <React.Fragment>
      <h1>
        <Translate value="application.title" />
      </h1>
      <div>
        <Translate value="application.hello" name="Aad" />
      </div>
      <ul>
        <li>
          <Translate value="export" count={1} />
        </li>
        <li>
          <Translate value="export" count={2} />
        </li>
      </ul>
      <p>
        <Localize value="07-2016-04" dateFormat="date.long" parseFormat="dd-yyyy-MM" />
      </p>
      <p>
        <Localize value="2015-09-03" dateFormat="date.long" />
      </p>
      <p>
        <Localize
          value={10 / 3}
          options={{
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }}
        />
      </p>
      <p>
        <Localize value="2015-09-03" dateFormat="distance-to-now" />
      </p>
      <I18n render={() => <input placeholder={translate('application.title')} />} />
    </React.Fragment>
  );
}

console.log(ReactDOMServer.renderToString(<AwesomeComponent />));
