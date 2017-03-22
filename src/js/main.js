import VueI18n from 'vue-i18n';
import VueResource from 'vue-resource';

import esLocales from 'locales/es.json';
import enLocales from 'locales/en.json';

import DefaultLayout from 'js/layouts/default';

import router from 'js/router.js';

require('scss/main.scss');

/* --- Vue-Resource --- */
Vue.use(VueResource);

Vue.http.options.root = API_HOST;



/* --- Locales --- */
const locales = {
  en: enLocales,
  es: esLocales
};

Vue.use(VueI18n);

// set lang
Vue.config.lang = 'es';

// set locales
Object.keys(locales).forEach((lang) => {
  Vue.locale(lang, locales[lang]);
});


// Create and mount the root instance.
// Make sure to inject the router with the router option to make the
// whole app router-aware.
new Vue({
  router,
  components: {
    DefaultLayout
  }
}).$mount('#app');
