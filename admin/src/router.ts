import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import i18n from './translation';
import locales from '@/locales.json';
import PageNotFound from '@/views/PageNotFound.vue';
import globalConfig from '../../api/config';
import userService from './services/user.service';
import { UserRole } from '../../api/src/entity/User';
import authenticationService from './services/authentication.service';

Vue.use(VueRouter);

const LocaleRouter = (routes: any) => {
  return new VueRouter({
    mode: 'history',
    routes: [
      {
        path: `/:locale(${locales.map(e => e.code).join('|')})?`,
        component: {
          render: c => c('router-view'),
        },
        children: routes,
      },
    ],
  });
};

const router = LocaleRouter([
  {
    path: '/',
    component: () => import('./views/home/Home.vue'),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('./views/home/pages/Welcome.vue'),
      },
      {
        path: 'account',
        name: 'account',
        component: () => import('./views/home/account/Account.vue'),
      },
      {
        path: 'users',
        name: 'users',
        meta: {
          rolesAllowed: [UserRole.ADMIN],
        },
        component: () => import('./views/home/user/Users.vue'),
      },
    ],
  },
  {
    path: 'login',
    name: 'login',
    component: () => import('./views/Login.vue'),
    meta: {
      offlineMode: true,
    },
  },
  {
    path: 'register',
    name: 'register',
    component: () => import('./views/Register.vue'),
    meta: {
      offlineMode: true,
    },
  },
  {
    path: 'password-reset',
    name: 'password-reset',
    component: () => import('./views/PasswordReset.vue'),
    meta: {
      offlineMode: true,
    },
  },
  {
    path: 'account-confirmation',
    name: 'account-confirmation',
    component: () => import('./views/AccountConfirmation.vue'),
    meta: {
      offlineMode: true,
    },
  },
  {
    path: 'password-reset/confirmation',
    name: 'password-reset-confirmation',
    component: () => import('./views/PasswordResetConfirmation.vue'),
    meta: {
      offlineMode: true,
    },
  },
  { name: 'page-not-found', path: 'page-not-found', alias: '*', component: PageNotFound },
  {
    path: '*',
    redirect: { name: 'page-not-found' },
  },
]);

router.beforeEach(async (to, from, next) => {
  if (from.name && to.params.locale === undefined && i18n.locale !== process.env.VUE_APP_LOCALE) {
    return next({
      name: to.name,
      query: to.query,
      params: {
        ...to.params,
        locale: from.params.locale,
      },
    });
  }

  const localeParam = to.params.locale;

  if (locales.find(locale => locale.code === localeParam) && i18n.locale !== localeParam) {
    i18n.locale = localeParam;
  }

  if (process.env.VUE_APP_LOCALE === localeParam) {
    // @ts-ignore: console error
    return next({
      name: to.name,
      query: to.query,
      params: {
        ...to.params,
        locale: undefined,
      },
      replace: true,
    });
  }

  const isAuthenticated = !!window.$cookies.get(globalConfig.tokenPayloadCookieName);

  if (isAuthenticated && !store.getters.hasCurrentUser) {
    try {
      const data: any = await authenticationService.authenticate();
      if (data.authenticate) {
        store.commit('set_current_user', { currentUser: data.user });
      } else {
        await authenticationService.logout();
        await store.commit('set_redirect_url', { redirectUrl: to.fullPath });
        return next({
          name: 'login',
          params: to.params,
        });
      }
    } catch (e) {
      // console.log(e);
    }
  }

  const requiresAuth = to.meta.requiresAuth || to.matched.find(data => data.meta.requiresAuth);
  const rolesAllowed = Array.from(
    new Set(
      to.matched
        .map(route => route.meta.rolesAllowed)
        .filter(rolesAllowed => Array.isArray(rolesAllowed))
        .flat(),
    ),
  );

  if (requiresAuth && !isAuthenticated) {
    await store.commit('set_redirect_url', { redirectUrl: to.fullPath });
    return next({
      name: 'login',
      params: to.params,
    });
  } else if (
    requiresAuth &&
    isAuthenticated &&
    store.getters.hasCurrentUser &&
    rolesAllowed.length &&
    !rolesAllowed.includes(store.getters.currentUser.role)
  ) {
    return next({
      name: 'page-not-found',
      params: to.params,
    });
  } else if (isAuthenticated && to.meta.offlineMode) {
    return next({
      name: 'home',
      params: to.params,
      replace: true,
    });
  }

  return next();
});

export default router;
