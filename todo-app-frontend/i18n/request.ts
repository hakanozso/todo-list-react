import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async (context) => {
  // Support both `locale` and `requestLocale` across different next-intl versions
  const localePromise = context.locale || (context as any).requestLocale;
  const resolvedLocale = await localePromise;
  
  const safeLocale =
    resolvedLocale && ['tr', 'en'].includes(resolvedLocale) ? resolvedLocale : 'tr';

  const messages = (await import(`../messages/${safeLocale}.json`)).default;

  return {
    locale: safeLocale,
    messages
  };
});