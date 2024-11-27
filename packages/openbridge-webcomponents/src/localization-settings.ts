import {configureLocalization, LocaleModule} from '@lit/localize';

// Generated via output.localeCodesModule

import {sourceLocale, targetLocales} from './generated/locale-codes';

import * as templates_es_419 from './generated/locales/es-419';

const localizedTemplates = new Map([['es-419', templates_es_419]]);

export const {getLocale, setLocale} = configureLocalization({
  sourceLocale,
  targetLocales,
  loadLocale: async (locale): Promise<LocaleModule> =>
    localizedTemplates.get(locale) as LocaleModule,
});
