// TypeScript Version: 3.7
import React = require('react');

export class I18n extends React.Component {}

// Localization
export type LocaleGetter = () => string;
export function getLocale(): string | undefined;
export function setLocale(locale: string, rerenderComponents?: boolean): void;
export function setLocaleGetter(fn: LocaleGetter): void;

export interface LocalizeDateOptions {
  locale?: string;
  parseFormat?: string;
  dateFormat?: string;
}
export type LocalizeNumberOptions = Intl.NumberFormatOptions;
export function localize(value: string | number, options?: LocalizeDateOptions): string;
export function localize(value: number, options?: LocalizeNumberOptions): string;
export function l(value: string | number, options?: LocalizeDateOptions): string;
export function l(value: number, options?: LocalizeNumberOptions): string;

export type LocalizeDateProps = {
  value: string | number;
} & LocalizeDateOptions;
export type LocalizeNumberProps = {
  value: number;
} & LocalizeNumberOptions;
export class Localize extends React.Component<LocalizeDateProps | LocalizeNumberProps> {}

// Translations
export type Translations = Record<string, any>;
// The `count` key has some special behavior, so we need to support number. See src/lib/utils.js#L36
// The value gets piped into `Array.join`, so the number will get coerced to a string. Should be ok.
export type Replacements = Record<string, string | number>;

export type TranslationsGetter = () => Translations;
export function getTranslations(): Translations | undefined;
export function setTranslations(transations: Translations, rerenderComponents?: boolean): void;
export function setTranslationsGetter(fn: TranslationsGetter): void;

export type ReplacementsGetter = (key: string, replacements: Replacements) => string;
export function setHandleMissingTranslation(fn: ReplacementsGetter): void;

export interface TranslateOptions {
  locale?: string;
  returnNullOnError?: boolean;
  returnKeyOnError?: boolean;
}

export function translate(key: string, replacements?: Replacements, options?: TranslateOptions): string;
export function t(key: string, replacements?: Replacements, options?: TranslateOptions): string;

export type TranslateProps = {
  value: string;
} & Replacements;
export class Translate extends React.Component<TranslateProps> {}

// Utility
export function forceComponentsUpdate(): void;
