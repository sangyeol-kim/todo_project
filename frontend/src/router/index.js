import Vue from 'vue';
import Router from 'vue-router';
// import New from '@/components/TodoForm'
import Todos from '@/components/TodoList'
import Edit from '@/components/TodoEditForm'
import E404 from '../views/e404'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy, {
  defaultIconPack: 'fas'
});

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Todos',
      component: Todos
    },
    {
      path: '/todos/edit/:id',
      name: 'Edit',
      component: Edit
    },
    {
      path: '*',
      name: 'e404',
      component: E404
    }
  ]
});
