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
    path: '/countries',
    name: 'Countries',
    component: () => import('../views/Countries.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
