<!--
<template>
  <div class="container">
    <h1>할 일을 기록해보세요!</h1>
    <todo-form @create="create"/>

    <h1 class="todos-title">Todos</h1>
    <div class="todo-list">
      <div v-for="todo in todos" v-bind:key="todo._id">
        <div>
          <b-checkbox v-model="todo.done"></b-checkbox>
          <b-icon v-bind:style="{color : todo.priority}" pack="fas" icon="fas fa-exclamation" size="is-small"></b-icon>
          <del v-if="todo.done">{{todo.title}}</del>
          <strong v-else>{{todo.title}}</strong>
          <b-notification
            v-if="(moment(today).format('YYYY-MM-DD') > moment(todo.deadline).format('YYYY-MM-DD'))"
            type="is-danger"
            has-icon
            aria-close-label="Close notification"
            role="alert">
            데드라인 마감
          </b-notification>
          <button><router-link :to="{ name: 'Todo', params: { id: todo._id }}">자세히</router-link></button>
          <button><router-link :to="{ name: 'Edit', params: { id: todo._id }}">수정</router-link></button>
          <button @click="deleteTodo(todo._id)">삭제</button>
        </div>
      </div>
    </div>
  </div>
</template>
-->

<template>
    <div class="wrapper">
        <b-table :data="todos">

            <template slot-scope="props">
                <b-table-column field="completed" label="완료">
                    <b-checkbox 
                      v-model="props.row.done">
                    </b-checkbox>
                </b-table-column>

                <b-table-column field="priority" label="우선순위">
                  <b-icon 
                    v-bind:style="{color : props.row.priority}" 
                    pack="fas" 
                    icon="fas fa-exclamation" 
                    size="is-small">
                  </b-icon>
                </b-table-column>

                <b-table-column field="title" label="제목">
                    <del v-if="props.row.done"><strong>{{props.row.title}}</strong></del>
                    <strong v-else>{{props.row.title}}</strong>
                </b-table-column>

                <b-table-column field="deadline" label="데드라인">
                    <span 
                      v-if="(moment(today).format('YYYY-MM-DD') > moment(props.row.deadline).format('YYYY-MM-DD'))">
                      데드라인 초과
                    </span>
                    <span v-else>
                      {{moment(props.row.deadline).format('YYYY-MM-DD')}}
                    </span>
                </b-table-column>

                <!-- <b-table-column field="deadline" label="데드라인">
                  <button @click="$router.push(`/todos/${props.row._id}`)">자세히</button>
                </b-table-column> -->

                <b-table-column field="deadline" label="데드라인">
                  <b-button @click="$router.push(`/todos/edit/${props.row._id}`)">수정</b-button>
                </b-table-column>

                <b-table-column field="deadline" label="데드라인">
                  <b-button @click="deleteTodo(props.row._id)">삭제</b-button>
                </b-table-column>
            </template>
        </b-table>
    </div>
</template>

<script>
import moment from 'moment'
import TodoForm from './TodoForm';

export default {
  data () {
    return {
      todos: {},
      today: new Date(),
      columns: [{}, {}, {}, {}, {}, {}]
    }
  },
  created () {
    this.$http.get('/api/todos')
    .then((response) => {
      this.todos = response.data
    })
  },
  components: {
    TodoForm
  },
  methods: {
    create (payload) {
      this.todos.push(payload)
    },
    deleteTodo (id) {
      const targetIndex = this.todos.findIndex(v => v._id === id)
      this.$http.delete(`/api/todos/${id}`)
      .then((response) => {
        this.todos.splice(targetIndex, 1)
      })
      // .catch(e => {
      //   this.errors.push(e)
      // })
    }
  }
}
</script>

<style scope>
  .wrapper {
    margin-left: 30em;
    margin-right: 30em;
  }
  a {
    color: black;
  }
  b-table {
    float:left;
  }
  del {
    color: red;
  }
</style>