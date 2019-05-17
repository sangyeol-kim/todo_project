<template>
  <div id="todo-edit-form">
    <h1> 수정하기 </h1>
    <form @submit.prevent="update(todo._id)">
      제목 : <input v-model="todo.title"> <br />
      내용 : <input v-model="todo.content"> <br />
      <button>수정하기</button>
    </form>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      todo: {}
    }
  },
  created () {
    let id = this.$route.params.id
    this.$http.get(`/api/todos/edit/${id}`)
    .then((response) => {
      this.todo = response.data
    })
  },
  methods: {
    update (id) {
      this.$http.put(`/api/todos/${id}`, this.todo)
      .then(
        (response) => {
          this.$router.push(`/todos/${id}`)
        },
        (err) => {
          alert('Error')
        }
      )
      .catch(function (error) {
        alert('error')
      })
    }
  }
}

  // methods: {
  //   deleteTodo (id) {
  //     const targetIndex = this.todos.findIndex(v => v._id === id)
  //     this.$http.delete(`/api/todos/${id}`)
  //     .then((response) => {
  //       this.todos.splice(targetIndex, 1)
  //     })
  //     // .catch(e => {
  //     //   this.errors.push(e)
  //     // })
  //   }
  // }
</script>