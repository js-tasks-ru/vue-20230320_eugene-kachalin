import { createRouter, createWebHistory } from 'vue-router';
// import { isAuthenticated } from '../services/authService.js';
import { log, auth, guest } from '../services/middleware.js';

const router = createRouter({
  history: createWebHistory('/05-vue-router/05-AuthGuard'),
  routes: [
    {
      path: '/',
      alias: '/meetups',
      component: () => import('../views/PageMeetups.vue'),
      meta: {
        middleware: log
      },
    },
    {
      path: '/login',
      meta: {
        // requireGuest: true,
        middleware: [guest, log],
      },
      component: () => import('../views/PageLogin.vue'),
    },
    {
      path: '/register',
      meta: {
        // requireGuest: true,
        middleware: [guest, log],
      },
      component: () => import('../views/PageRegister.vue'),
    },
    {
      path: '/meetups/create',
      meta: {
        // requireAuth: true,
        middleware: [auth, log],
      },
      component: () => import('../views/PageCreateMeetup.vue'),
    },
    {
      path: '/meetups/:meetupId(\\d+)/edit',
      meta: {
        // requireAuth: true,
        middleware: [auth, log],
      },
      component: () => import('../views/PageEditMeetup.vue'),
    },
  ],
});

// TODO add async support
router.beforeEach((to, from) => {
  if (to.meta.middleware) {
    const middlewares = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];

    for (let middleware of middlewares) {
      const result = middleware(to, from);
      if (result !== undefined && result !== true) return result;
    }
  }

  // const requireAuth = to.meta.requireAuth,
  //   requireGuest = to.meta.requireGuest;

  // if (!isAuthenticated()) {
  //   return requireAuth ? {path: '/login', query: {from: to.path} } : true;
  // } else {
  //   return requireGuest ? '/' : true;
  // }

});

export { router };
