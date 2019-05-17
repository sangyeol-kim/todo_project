<template>
  <div>
    <h1>Todo</h1>
      {{todo.title}}
    </div>
</template>

<script>
export default {
  data () {
    return {
      todo: []
    }
  },
  created () {
    let id = this.$route.params.id
    this.$http.get(`/api/todos/${id}`)
    .then((response) => {
      this.todo = response.data
    })
  }
}
</script>