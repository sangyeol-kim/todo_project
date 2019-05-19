<template>
  <form>
    <h1 class="h1-top-title">등록된 To-do를 수정해보세요!</h1>
    <div>
      <b-field>
        <b-input 
          v-model="todo.title"
          value="todo.title"
          icon="fas fa-list-ul"
          size="is-large">
        </b-input>
      </b-field>
    </div>
    <div>
      <b-field class="deadline-field">
        <b-datepicker
          v-model="todo.deadline"
          size="is-medium"
          :min-date="minDate">
        </b-datepicker>
      </b-field>
    </div>
    <div>
      <div class="block">
        <b-radio v-model="todo.priority"
            native-value=1
            size="is-medium"
            type="is-danger">
            중요
        </b-radio>
        <b-radio v-model="todo.priority"
            native-value=2
            size="is-medium"
            type="is-warning">
            보통
        </b-radio>
        <b-radio v-model="todo.priority"
            native-value=3
            size="is-medium"
            type="is-dark">
            낮음
        </b-radio>
      </div>
    </div>
    <b-button class="update-button"
      v-on:click.prevent="update(todo._id)" 
      type="is-primary">
      수정하기
    </b-button>
    <br />

    <router-link :to="{ name: 'Todos'}" class="back-button">
      <b-button
        type="is-primary">
        뒤로 가기
      </b-button>
    </router-link>
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
  created () {
    let id = this.$route.params.id
    this.$http.get(`/api/todos/edit/${id}`)
    .then((response) => {
      this.todo = response.data
    },
    (err) => {
      console.error(err)
      alert('수정된 페이지를 불러오는데 실패했습니다.')
    })
  },
  methods: {
    update (id) {
      this.$http.put(`/api/todos/${id}`, this.todo)
      .then(
        (response) => {
          this.$router.push('/')
        },
        (err) => {
          console.error(err)
          alert('수정에 실패했습니다.')
        }
      )
    }
  }
}
</script>

<style scope>
  form {
  font-family: "BMHANNAPro";
  margin: 20em auto;
  width: 40em;
  }

  .deadline-field {
    margin: 0.5em auto;
    width: 20em;
  }

  .update-button {
    margin: 0.5em auto;
    width: 30em;
  }

  .back-button {
    margin: 0.5em auto;
    width: 30em;
  }

  .h1-top-title {
    /* font-family: "BMHANNAPro"; */
    font-size: 2.5em;
    font-family: 'yg-jalnan';
  }

</style>