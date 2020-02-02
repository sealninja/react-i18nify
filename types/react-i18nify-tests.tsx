import React from 'react';
import {
  I18n,
  addLocale,
  addLocales,
  getLocale,
  setLocale,
  setLocaleGetter,
  localize,
  l,
  Localize,
  getTranslations,
  setTranslations,
  setTranlationsGetter,
  setHandleMissingTranslation,
  Replacements,
  translate,
  t,
  Translate,
} from 'react-i18nify';
import enUS from 'date-fns/esm/locale/en-US';

<I18n />;

addLocale('en', enUS); // $ExpectType void
addLocale(1234, enUS); // $ExpectError
addLocale('en', 'foo'); // $ExpectError

addLocales({ en: enUS }); // $ExpectType void
addLocales('foo'); // $ExpectError
addLocales({ en: 'foo' }); // $ExpectError

getLocale(); // $ExpectType string | undefined

setLocale('en'); // $ExpectType void
setLocale('en', true); // $ExpectType void
setLocale(123); // $ExpectError
setLocale('en', 123); // $ExpectError

setLocaleGetter(() => 'en'); // $ExpectType void
setLocaleGetter(() => 123); // $ExpectError

localize('11-11-2019'); // $ExpectType string
localize('11-11-2019', { dateFormat: 'mm/dd/YYYY', parseFormat: 'mm-dd-YYYY' }); // $ExpectType string
localize(1234567890, { dateFormat: 'mm/dd/YYYY', parseFormat: 'mm-dd-YYYY' }); // $ExpectType string
localize('11-11-2019', { maximumFractionDigits: 2 }); // $ExpectError

localize(1234); // $ExpectType string
localize(1234, { maximumFractionDigits: 2 }); // $ExpectType string

localize(true); // $ExpectError

l('11-11-2019'); // $ExpectType string
l('11-11-2019', { dateFormat: 'mm/dd/YYYY', parseFormat: 'mm-dd-YYYY' }); // $ExpectType string
l(1234567890, { dateFormat: 'mm/dd/YYYY', parseFormat: 'mm-dd-YYYY' }); // $ExpectType string
l('11-11-2019', { maximumFractionDigits: 2 }); // $ExpectError

l(1234); // $ExpectType string
l(1234, { maximumFractionDigits: 2 }); // $ExpectType string

l(true); // $ExpectError

<Localize />; // $ExpectError
<Localize value="11-11-2019" />;
<Localize
  value="11-11-2019"
  dateFormat="mm/dd/YYYY"
  parseFormat="mm-dd-YYYY"
/>;
<Localize value={1234} dateFormat="mm/dd/YYYY" parseFormat="mm-dd-YYYY" />;
<Localize value={1234} maximumFractionDigits={2} />;

getTranslations(); // $ExpectType Record<string, any> | undefined

setTranslations({ foo: 'bar', baz: { foo: 'bar' } }); // $ExpectType void
setTranslations({ foo: 'bar' }, true); // $ExpectType void
setTranslations('asdf'); // $ExpectError
setTranslations({ foo: 'bar' }, 'asdf'); // $ExpectError

setTranlationsGetter(() => ({ foo: 'bar' })); // $ExpectType void
setTranlationsGetter(() => 'asdf'); // $ExpectError

setHandleMissingTranslation(() => 'asdf'); // $ExpectType void
setHandleMissingTranslation((key: string) => 'asdf'); // $ExpectType void
// $ExpectType void
setHandleMissingTranslation(
  (key: string, replacements: Replacements) => 'asdf'
);

translate('foo.bar'); // $ExpectType string
translate('foo.bar', { asdf: 'baz' }); // $ExpectType string
translate('foo.bar', { count: 1234 }); // $ExpectType string
translate('foo.bar', { asdf: true }); // $ExpectError
t('foo.bar'); // $ExpectType string
t('foo.bar', { asdf: 'baz' }); // $ExpectType string
t('foo.bar', { count: 1234 }); // $ExpectType string
t('foo.bar', { asdf: true }); // $ExpectError

<Translate />; // $ExpectError
<Translate value="foo.bar" />;
<Translate value="foo.bar" asdf="baz" />;
<Translate value="foo.bar" count={1234} />;
<Translate value="foo.bar" asdf={true} />; // $ExpectError
