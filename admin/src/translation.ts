import Vue from "vue";
import VueI18n from "vue-i18n";
import frMessages from "@/translations/messages.fr.json";
import enMessages from "@/translations/messages.en.json";

Vue.use(VueI18n);

export default new VueI18n({
  locale: process.env.VUE_APP_LOCALE,
  fallbackLocale: process.env.VUE_APP_LOCALE,
  messages: {
    fr: frMessages,
    en: enMessages
  }
});
