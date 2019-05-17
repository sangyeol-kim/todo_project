import Vue from 'vue';
import Router from 'vue-router';
// import New from '@/components/TodoForm'
import Todos from '@/components/TodoList'
import Todo from '@/components/TodoShow'
import Edit from '@/components/TodoEditForm'
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
    // {
    //   path: '/todos/new',
    //   name: 'New',
    //   component: New
    // },
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
