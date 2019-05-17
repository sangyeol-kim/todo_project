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
      todo: {}
    }
  },
  methods: {
    create: function() {
      this.$http.post('/api/todos/create', this.todo)
      .then(
        (response) => {
          console.log(response)
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