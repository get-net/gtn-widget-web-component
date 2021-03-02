import VueI18n from "vue-i18n";
import Vue from 'vue';

import en from './en.json';
import ru from './ru.json';

Vue.use(VueI18n);

export const getLocale = () => {
    //logic here
    return "ru" || "en";
}

const messages = {
    en: en,
    ru: ru
};

const i18n = new VueI18n({
    locale: getLocale(),
    fallbackLocale: 'en',
    messages
});

export default i18n;