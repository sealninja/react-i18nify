# React I18nify
Simple i18n translation and localization components and helpers for React applications.

[![NPM version](https://img.shields.io/npm/v/react-i18nify.svg?style=flat-square)](https://npmjs.org/package/react-i18nify)
[![Downloads](https://img.shields.io/npm/dm/react-i18nify.svg?style=flat-square)](https://npmjs.org/package/react-i18nify)
[![Dependency Status](https://img.shields.io/david/sealninja/react-i18nify?style=flat-square)](https://david-dm.org/sealninja/react-i18nify)

A working example of this package can be found [here at RunKit](https://runkit.com/npm/react-i18nify).

## Table of contents

* [Installation](#installation)
* [Getting started](#getting-started)
* [Components](#components)
* [Helpers](#helpers)
* [API reference](#api-reference)

## Installation

Install by using npm:

```
$ npm i --save react-i18nify
```

## Getting started

Start by loading setting translations and locale to be used:

```javascript
const { I18n } = require('react-i18nify');

I18n.setTranslations({
  en: {
    application: {
      title: 'Awesome app with i18n!',
      hello: 'Hello, %{name}!'
    },
    date: {
      long: 'MMMM Do, YYYY'
    },
    export: 'Export %{count} items',
    export_0: 'Nothing to export',
    export_1: 'Export %{count} item',
    two_lines: 'Line 1<br />Line 2'
  },
  nl: {
    application: {
      title: 'Toffe app met i18n!',
      hello: 'Hallo, %{name}!'
    },
    date: {
      long: 'D MMMM YYYY'
    },
    export: 'Exporteer %{count} dingen',
    export_0: 'Niks te exporteren',
    export_1: 'Exporteer %{count} ding',
    two_lines: 'Regel 1<br />Regel 2'
  }
});

I18n.setLocale('nl');
```

Now you're all set up to start unleashing the power of `react-i18nify`!

## Components

The easiest way to translate or localize in your React application is by using the `Translate` and `Localize` components:

```javascript
const { Translate, Localize } = require('react-i18nify');

<Translate value="application.title" />
  // => <span>Toffe app met i18n!</span>
<Translate value="application.title" style={{ fontWeight: 'bold', fontSize: '14px' }} />
  // => <span style="font-weight:bold;font-size:14px;">Toffe app met i18n!</span>
<Translate value="application.hello" name="Aad" />
  // => <span>Hallo, Aad!</span>
<Translate value="export" count={1} />
  // => <span>Exporteer 1 ding</span>
<Translate value="export" count={2} />
  // => <span>Exporteer 2 dingen</span>
<Translate value="two_lines" dangerousHTML />
  // => <span>Regel 1<br />Regel 2</span>
<Translate value="application.title" tag="h1" />
 // => <h1>Toffe app met i18n!</h1>

<Localize value="2015-09-03" dateFormat="date.long" />
  // => <span>3 september 2015</span>
<Localize value="2015-09-03" dateFormat="date.long" tag="div" />
  // => <div>3 september 2015</div>
<Localize value={10/3} options={{style: 'currency', currency: 'EUR', minimumFractionDigits: 2, maximumFractionDigits: 2}} />
  // => <span>€ 3,33</span>
```

## Helpers

If for some reason, you cannot use the components, you can use the `I18n.t` and `I18n.l` helpers instead.
These helpers however will not be re-rendered automatically in any way, so if you use those, it's up to you to handle state change.

```javascript
const { I18n } = require('react-i18nify');

I18n.t('application.title');
  // => Toffe app met i18n!
I18n.t('application.hello', {name: 'Aad'});
  // => Hallo, Aad!'
I18n.t('export', {count: 0});
  // => Niks te exporteren
I18n.t('application.unknown_translation');
  // => unknown_translation
I18n.t('application', {name: 'Aad'});
  // => {hello: 'Hallo, Aad!', title: 'Toffe app met i18n!'}

I18n.l(1385856000000, { dateFormat: 'date.long' });
  // => 1 december 2013
I18n.l(Math.PI, { maximumFractionDigits: 2 });
  // => 3,14
```

## API Reference

### `I18n`

Main module for handling all configurations and translations, with the following functions:

#### `setLocale(locale, rerenderComponents = true)`

The used locale can be set with this function. By default, changing the locale will re-render all components.
This behavior can be prevented by providing `false` as a second argument.

#### `setTranslations(translations, rerenderComponents = true)`

The used translations can be set with this function. By default, changing the translations will re-render all components.
This behavior can be prevented by providing `false` as a second argument.

#### `setLocaleGetter(fn)`

Alternatively to using `setLocale`, you can provide a callback to return the locale with `setLocaleGetter`:

```javascript
const { I18n } = require('react-i18nify');

const locale = () => 'nl';

I18n.setLocaleGetter(locale);
```

#### `setTranslationsGetter(fn)`

Alternatively to using `setTranslations`, you can provide a callback to return the translations with `setTranslationsGetter`:

```javascript
const { I18n } = require('react-i18nify');

const translation = () => ({
  en: { ... },
  nl: { ... }
});

I18n.setTranslationsGetter(translation);
```

#### `setHandleMissingTranslation(fn)`

By default, when a translation is missing, the translation key will be returned in a slightly formatted way,
as can be seen in the `I18n.t('application.unknown_translation');` example above.
You can however overwrite this behavior by setting a function to handle missing translations.

```javascript
const { I18n } = require('react-i18nify');

const myHandleMissingTranslation = (key, replacements) => `Missing translation: ${key}`;

I18n.setHandleMissingTranslation(myHandleMissingTranslation);

I18n.t('application.unknown_translation');
  // => Missing translation: application.unknown_translation
```

#### `t(key, replacements = {})`

Helper function to translate a `key`, given an optional set of `replacements`. See the above Helpers section for examples.

#### `l(value, options)`

Helper function to localize a `value`, given a set of `options`. See the above Helpers section for examples.

For localizing dates, the `moment` library is used.
A `dateFormat` option can be used for providing a translation key with the format string.
For the full list of formatting tokens which can be used in the format string, see http://momentjs.com/docs/#/displaying/format/.
Moreover, a `strictParse` option can be provided. When set to `true`, `moment`'s strict parsing will be used.

For number formatting, the localize helper supports all options as provided by the Javascript built-in `Intl.NumberFormat` object.
For the full list of options, see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat.

#### `forceComponentsUpdate()`

This function can be called to force a re-render of all I18n components.

### `<Translate>`

React translate component, with the following props:

#### `value` (string)

The translation key to translate.

#### `dangerousHTML` (bool)

If `true`, HTML is allowed in the translation. Defaults to `false`.

#### `className` (string)

Optional CSS classname.

#### `tag` (string|func)

HTML element to render the translation in. Defaults to `span`.

#### `style` (object)

Optional inline styling

#### Other props

All other provided props will be used as replacements for the translation.

### `<Localize>`

React localize component, with the following props:

#### `value` (number|string|object)

The number or date to localize.

#### `dateFormat` (string)

The translation key for providing the format string. Only needed for localizing dates.
For the full list of formatting tokens which can be used in the format string, see http://momentjs.com/docs/#/displaying/format/.

#### `options` (object)

When localizing dates, a `strictParse` option can be provided. When set to `true`, `moment`'s strict parsing will be used.

When localizing numbers, the localize component supports all options as provided by the Javascript built-in `Intl.NumberFormat` object.
For the full list of options, see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat.

#### `dangerousHTML` (bool)

If `true`, HTML is allowed in the localization. Defaults to `false`.

#### `className` (string)

Optional CSS classname.

#### `tag` (string|func)

HTML element to render the localization in. Defaults to `span`.

#### `style` (object)

Optional inline styling

[version-image]: https://img.shields.io/npm/v/react-i18nify.svg
[downloads-image]: https://img.shields.io/npm/dm/react-i18nify.svg

[npm-url]: https://npmjs.org/package/react-i18nify
