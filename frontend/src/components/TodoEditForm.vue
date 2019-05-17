<template>
  <div id="todo-edit-form">
    <h1> 수정하기 </h1>
    <form @submit.prevent="update(todo._id)">
      제목 : <input v-model="todo.title"> <br />
      내용 : <input v-model="todo.content"> <br />

      <section>
        <div class="block">
          우선순위: 
          <b-radio v-model="todo.priority"
              native-value="red"
              size="is-small"
              type="is-danger">
              중요
          </b-radio>
          <b-radio v-model="todo.priority"
              native-value="orange"
              size="is-small"
              type="is-warning">
              보통
          </b-radio>
          <b-radio v-model="todo.priority"
              native-value="black"
              size="is-small"
              type="is-dark">
              낮음
          </b-radio>
        </div>
      </section>
      <b-field label="마감기한">
        <b-datepicker
          v-model="todo.deadline"
          placeholder="마감기한을 설정하세요."
          size="is-small"
          :min-date="minDate">
        </b-datepicker>
      </b-field>

      <button>수정하기</button>
    </form>
  </div>
</template>

<script>
export default {
  data: function () {
    const today = new Date()
    return {
      todo: {},
      date: new Date(),
      minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
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

<style scope>
  .datepicker {
    display: inline-block;
    width: 20em;
  }
  input {
    text-align: center;
  }
</style>