import Vue from 'vue';
import Router from 'vue-router';
import HellowWorld from '@/components/HelloWorld';

import New from '@/components/TodoForm'
import Todos from '@/components/TodoList'
import Todo from '@/components/TodoShow'
import Edit from '@/components/TodoEditForm'

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
      path: '/todos',
      name: 'Todos',
      component: Todos
    },
    {
      path: '/todos/new',
      name: 'New',
      component: New
    },
    {
      path: '/todos/edit/:id',
      name: 'Edit',
      component: Edit
    },
    {
      path: '/todos/:id',
      name: 'Todo',
      component: Todo
    }
  ]
});
