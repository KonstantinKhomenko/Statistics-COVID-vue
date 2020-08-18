import Vue from 'vue';
import VueRouter from 'vue-router';
import Total from '../views/Total.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Total',
    component: Total
  },
  {
    path: '/top10countries',
    name: 'Top10Countries',
    component: () => import('../views/Top10Countries.vue')
  },
  {
    path: '/country/:country',
    name: 'Country',
    component: () => import('../views/Country.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
