import Vue from 'vue';
import VueI18n from 'vue-i18n';
import VueClipboard from 'vue-clipboard2';

import 'normalize.css';
import './assets/style/base.css';
import 'vue-multiselect/dist/vue-multiselect.min.css';

import router from './router';
import store from './store';

import App from './App.vue';

import cn from './i18n/zh-CN';
import en from './i18n/en';

Vue.use(VueI18n);
Vue.use(VueClipboard);

Vue.config.productionTip = false;

// "en"、"en-US"、"fr"、"es-ES"、"zh-cn"、"zh-CN"
const lang = (navigator.language || navigator.browserLanguage).toLowerCase();

const messages = {
  cn,
  en,
};

const i18n = new VueI18n({
  locale: lang === 'zh-cn' ? 'cn' : 'en', // set locale
  messages, // set locale messages
});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
