import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
    // This typically corresponds to the `[locale]` segment
    let locale = await requestLocale;

    // Ensure that a valid locale is used
    if (!locale || !routing.locales.includes(locale as any)) {
        locale = routing.defaultLocale;
    }

    try {
        const messages = {
            es: await import('../messages/es.json').then((module) => module.default),
            en: await import('../messages/en.json').then((module) => module.default),
        };

        return {
            locale,
            messages: messages[locale as keyof typeof messages] || messages['es']
        };
    } catch (error) {
        console.error(`Failed to load messages for locale ${locale}:`, error);
        return {
            locale,
            messages: {}
        };
    }
});
