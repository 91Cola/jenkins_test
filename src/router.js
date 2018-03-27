import Vue from 'vue';
import Router from 'vue-router';

import Register from './views/Register.vue';
import Detail from './views/Detail.vue';

Vue.use(Router);

// "en"、"en-US"、"fr"、"es-ES"、"zh-cn"、"zh-CN"
const defaultLang = (
  navigator.language || navigator.browserLanguage
).toLowerCase();

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'register',
      component: Register,
      beforeEnter: (to, from, next) => {
        if (from.path === '/') {
          to.query.lang
            ? next()
            : next({
                path: '/',
                query: {
                  lang: defaultLang,
                },
              });
        } else {
          to.query.lang !== from.query.lang
            ? next({
                path: '/',
                query: {
                  lang: from.query.lang,
                },
              })
            : next();
        }
      },
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail,
    },
  ],
});

export default router;
