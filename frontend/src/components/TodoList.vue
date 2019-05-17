<template>
  <div class="todos">
    <h1>Todos</h1>
    <router-link :to="{ name: 'New' }">글쓰기</router-link> <br><br>
    <div v-for="todo in todos" v-bind:key="todo" class="todo">
      <div>
        <strong>{{todo.title}}</strong>
        <router-link :to="{ name: 'Todo', params: { id: todo._id }}">자세히</router-link>
        <router-link :to="{ name: 'Edit', params: { id: todo._id }}">수정</router-link>
        <button type="submit" @click="deleteTodo(todo._id)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      todos: []
    }
  },
  created () {
    this.$http.get('/api/todos')
    .then((response) => {
      this.todos= response.data
    })
  },
  methods: {
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