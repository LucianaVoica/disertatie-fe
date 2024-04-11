import i18next from 'i18next';
import translation from 'zod-i18n-map/locales/ro/zod.json';
import { zodI18nMap } from 'zod-i18n-map';
import { z } from 'zod';

i18next.init({
  lng: 'ro',
  resources: {
    ro: {
      zod: translation,
    },
  },
});
z.setErrorMap(zodI18nMap);

export { z };
