<template>
    <form>
      <div>
        <b-field>
          <b-input 
            v-model="todo.title"
            placeholder="할 일을 작성해주세요."
            icon="fas fa-list-ul"
            size="is-large">
          </b-input>
        </b-field>
      </div>
      <div>
        <b-field>
          <b-datepicker
            v-model="todo.deadline"
            placeholder="마감기한을 설정하세요."
            size="is-small"
            :min-date="minDate">
          </b-datepicker>
        </b-field>
      </div>
      <div>
        <div class="block">
          <b-radio v-model="todo.priority"
              native-value="red"
              size="is-medium"
              type="is-danger">
              중요
          </b-radio>
          <b-radio v-model="todo.priority"
              native-value="orange"
              size="is-medium"
              type="is-warning">
              보통
          </b-radio>
          <b-radio v-model="todo.priority"
              native-value="black"
              size="is-medium"
              type="is-dark">
              낮음
          </b-radio>
        </div>
      </div>
      <b-button 
        v-on:click.prevent="create" 
        type="is-primary">
        Primary
      </b-button>
    </form>
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
  methods: {
    create: function() {
      this.$http.post('/api/todos/create', this.todo)
      .then(
        (response) => {
          this.$emit("create", response.data)
          // this.$router.push({name: 'Todo', params: { id: response.data._id }})
        },
        (err) => {
          alert('Error')
        }
      )
      .catch(function (error) {
        alert('error')
      })
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

  }
}
</script>

<style scope>

</style>