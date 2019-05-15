import Vue from 'vue';
import Router from 'vue-router';
import HellowWorld from '@/components/HelloWorld';

import New from '@/components/TodoForm'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HellowWorld
    },
    {
    path: '/todos/new',
    name: 'New',
    component: New
  }
  ]
});
