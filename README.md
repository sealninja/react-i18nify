# React I18nify

Simple i18n translation and localization components and helpers for React.

[![NPM version](https://img.shields.io/npm/v/react-i18nify.svg?style=flat-square)](https://npmjs.org/package/react-i18nify)
[![Downloads](https://img.shields.io/npm/dm/react-i18nify.svg?style=flat-square)](https://npmjs.org/package/react-i18nify)

A working example of this package can be found [here at RunKit](https://runkit.com/npm/react-i18nify).

## Migration guide

### Upgrading to v6

`react-i18nify` v6 uses `dayjs` for date localization instead of `date-fns`, to make `react-i18nify` smaller and simpler to use. Migrating to this version requires the following changes to your project:

- Replace locale imports. E.g., `import nl from 'date-fns/locale/nl';` needs to be replaced with `import 'dayjs/locale/nl';`
- Remove calls to `addLocale` and `addLocales`, these are not needed anymore.
- Update date formatting strings. For example, `MM-dd-yyyy` is now `MM-DD-YYYY`. See for more information the [day.js documentation](https://day.js.org/docs/en/display/format).

The v5 documentation can still be found [here](https://github.com/sealninja/react-i18nify/blob/v5/README.md).

## Installation

Install by using npm:

```
npm i react-i18nify
```

## Getting started

Start by setting the translations and locale to be used:

```javascript
import { setTranslations, setLocale } from 'react-i18nify';

setTranslations({
  en: {
    application: {
      title: 'Awesome app with i18n!',
      hello: 'Hello, %{name}!'
    },
    date: {
      long: 'MMMM do, yyyy'
    },
    export: 'Export %{count} items',
    export_0: 'Nothing to export',
    export_1: 'Export %{count} item',
    two_lines: <div>Line 1<br />Line 2<div>
  },
  nl: {
    application: {
      title: 'Toffe app met i18n!',
      hello: 'Hallo, %{name}!'
    },
    date: {
      long: 'd MMMM yyyy'
    },
    export: 'Exporteer %{count} dingen',
    export_0: 'Niks te exporteren',
    export_1: 'Exporteer %{count} ding',
    two_lines: <div>Regel 1<br />Regel 2</div>
  }
});

setLocale('nl');
```

Now you're all set up to unleash the power of `react-i18nify`!

## Components

The easiest way to translate or localize in your React application is by using the `Translate` and `Localize` components:

```javascript
import { Translate, Localize } from 'react-i18nify';

<Translate value="application.title" />
  // => Toffe app met i18n!
<Translate value="application.hello" name="Aad" />
  // => Hallo, Aad!
<Translate value="export" count={1} />
  // => Exporteer 1 ding
<Translate value="export" count={2} />
  // => Exporteer 2 dingen
<Translate value="two_lines" />
  // => <div>Regel 1<br />Regel 2</div>

<Localize value="07-2016-04" dateFormat="date.long" parseFormat="dd-yyyy-MM" />
  // => 7 april 2016
<Localize value="2015-09-03" dateFormat="date.long" />
  // => 3 september 2015
<Localize value="2015-09-03" dateFormat="distance-to-now" />
  // => 7 jaar geleden
<Localize value={10/3} options={{style: 'currency', currency: 'EUR', minimumFractionDigits: 2, maximumFractionDigits: 2}} />
  // => € 3,33
```

## Helpers

If for some reason, you cannot use the components, you can use the `translate` and `localize` helpers instead:

```javascript
import { translate, localize } from 'react-i18nify';

translate('application.title');
// => Toffe app met i18n!
translate('application.hello', { name: 'Aad' });
// => Hallo, Aad!'
translate('export', { count: 0 });
// => Niks te exporteren
translate('application.unknown_translation');
// => unknown_translation
translate('application', { name: 'Aad' });
// => {hello: 'Hallo, Aad!', title: 'Toffe app met i18n!'}

localize(1385856000000, { dateFormat: 'date.long' });
// => 1 december 2013
localize(Math.PI, { maximumFractionDigits: 2 });
// => 3,14
localize('huh', { dateFormat: 'date.long' });
// => null
```

If you want these helpers to be re-rendered automatically when the locale or translations change, you have to wrap them in a `<I18n>` component using its `render` prop:

```javascript
import { I18n, translate } from 'react-i18nify';

<I18n render={() => <input placeholder={translate('application.title')} />} />;
```

## Date localization

`react-i18nify` uses [day.js](https://github.com/iamkun/dayjs/) internally to handle date localization. To reduce the base bundle size, `day.js` localizations are not loaded by default. If you need date localization, you can manually import them. For a list of available locales, refer to the [day.js list of locales](https://github.com/iamkun/dayjs/tree/dev/src/locale).

```javascript
import 'dayjs/locale/en';
import 'dayjs/locale/nl';
import 'dayjs/locale/it';
```

## API Reference

### `<Translate>`

React translate component, with the following props:

- `value` (string)

The translation key to translate.

- Other props

All other provided props will be used as replacements for the translation.

### `<Localize>`

React localize component, with the following props:

- `value` (number|string|object)

The number or date to localize.

- `dateFormat` (string)

The translation key for providing the format string. Only needed for localizing dates.
For the full list of formatting tokens which can be used in the format string, see the [day.js documentation](https://day.js.org/docs/en/display/format).

- `parseFormat` (string)

An optional formatting string for parsing the value when localizing dates.
For the full list of formatting tokens which can be used in the parsing string, see the [day.js documentation](https://day.js.org/docs/en/parse/string-format).

- `options` (object)

When localizing numbers, the localize component supports all options as provided by the Javascript built-in `Intl.NumberFormat` object.
For the full list of options, see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat.

### `<I18n>`

React I18n wrapper component, with the following prop:

- `render` (func)

The return value of the provide function will be rendered and automatically re-render when the locale or translations change.

### `setLocale(locale, rerenderComponents = true)`

The used locale can be set with this function. By default, changing the locale will re-render all components.
This behavior can be prevented by providing `false` as a second argument.

### `getLocale()`

Get the currently used locale.

### `setTranslations(translations, rerenderComponents = true)`

The used translations can be set with this function. By default, changing the translations will re-render all components.
This behavior can be prevented by providing `false` as a second argument.

### `getTranslations()`

Get the currently used translations.

### `setLocaleGetter(fn)`

Alternatively to using `setLocale`, you can provide a callback to return the locale with `setLocaleGetter`:

```javascript
import { setLocaleGetter } from 'react-i18nify';

const localeFunction = () => 'nl';

setLocaleGetter(localeFunction);
```

### `setTranslationsGetter(fn)`

Alternatively to using `setTranslations`, you can provide a callback to return the translations with `setTranslationsGetter`:

```javascript
import { setTranslationsGetter } from 'react-i18nify';

const translationsFunction = () => ({
  en: { ... },
  nl: { ... }
});

setTranslationsGetter(translationsFunction);
```

### `setHandleMissingTranslation(fn)`

By default, when a translation is missing, the translation key will be returned in a slightly formatted way,
as can be seen in the `translate('application.unknown_translation');` example above.
You can however overwrite this behavior by setting a function to handle missing translations.

```javascript
import { setHandleMissingTranslation, translate } from 'react-i18nify';

setHandleMissingTranslation((key, replacements, options, err) => `Missing translation: ${key}`);

translate('application.unknown_translation');
// => Missing translation: application.unknown_translation
```

### `setHandleFailedLocalization(fn)`

By default, when a localization failed, `null` will be returned,
as can be seen in the `localize('huh', { dateFormat: 'date.long' });` example above.
You can however overwrite this behavior by setting a function to handle failed localizations.

```javascript
import { setHandleFailedLocalization, localize } from 'react-i18nify';

setHandleFailedLocalization((value, options, err) => `Failed localization: ${value}`);

localize('huh', { dateFormat: 'date.long' });
// => Failed localization: huh
```

### `translate(key, replacements = {})`

Helper function to translate a `key`, given an optional set of `replacements`. See the above Helpers section for examples.

### `localize(value, options)`

Helper function to localize a `value`, given a set of `options`. See the above Helpers section for examples.

For localizing dates, the `day.js` library is used.
A `dateFormat` option can be used for providing a translation key with the format string.
For the full list of formatting tokens which can be used in the format string, see the [day.js documentation](https://day.js.org/docs/en/display/format).
Moreover, `parseFormat` option can be used for providing a formatting string for parsing the value.
For the full list of formatting tokens which can be used in the parsing string, see the [day.js documentation](https://day.js.org/docs/en/parse/string-format).

For number formatting, the localize helper supports all options as provided by the Javascript built-in `Intl.NumberFormat` object.
For the full list of options, see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat.

### `t(key, replacements = {})`

Alias for `translate`.

### `l(value, options)`

Alias for `localize`.

### `forceComponentsUpdate()`

This function can be called to force a re-render of all I18n components.

## Example application with SSR

An example application with server-side rendering using features of `react-i18nify` can be found at https://github.com/sealninja/react-ssr-example.

## License

MIT
