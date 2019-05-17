<template>
  <div id="todo-form">
    <form @submit.prevent="create">
      제목 : <input v-model="todo.title" placeholder="제목"> <br />
      내용 : <input v-model="todo.content" placeholder="내용"> <br />
      우선순위: 
      <section>
        <div class="block">
          <b-radio v-model="todo.priority"
              native-value="high">
              중요
          </b-radio>
          <b-radio v-model="todo.priority"
              native-value="normal">
              보통
          </b-radio>
          <b-radio v-model="todo.priority"
              native-value="low">
              낮음
          </b-radio>
        </div>
    </section>
      일정:
      <b-field label="Select a date">
        <b-datepicker
            v-model="todo.deadline"
            placeholder="마감기한을 설정하세요."
            icon="calendar-today">
        </b-datepicker>
      </b-field> <br />
      <button>글쓰기</button>
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
  methods: {
    create: function() {
      this.$http.post('/api/todos/create', this.todo)
      .then(
        (response) => {
          console.log(response.data)
          this.$router.push({name: 'Todo', params: { id: response.data._id }})
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
</script>