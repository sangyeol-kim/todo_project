<template>
  <div id="todo-form">
    <div> 글쓰기 </div>
    제목 : <input v-model="todo.title" placeholder="제목"> <br />
    내용 : <input v-model="todo.content" placeholder="내용"> <br />
    <button v-on:click="create" >글쓰기</button>
  </div>
</template>

<script>
// import qs from 'qs'

export default {
  data: function () {
    return {
      todo: {
        title: '',
        content: '',
      }
    }
  },
  methods: {
    create: function(event) {
      this.$http.post('/api/todos/create', {
        todo: this.todo
      })
      .then(
        (response) => {
          this.$router.push('/')
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