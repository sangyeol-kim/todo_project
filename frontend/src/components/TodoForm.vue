<template>
    <form>
      <div>
        <b-field>
          <b-input 
            v-model="todo.title"
            v-validate="required"
            placeholder="할 일을 작성해주세요."
            icon="fas fa-list-ul"
            size="is-large">
          </b-input>
        </b-field>
      </div>
      <div>
        <b-field class="deadline-field">
          <b-datepicker
            v-model="todo.deadline"
            placeholder="데드라인을 설정하세요."
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
      <b-button class="create-button"
        v-on:click.prevent="create"
        type="is-primary">
        등록하기
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
          this.resetFields()
        },
        (err) => {
          alert('To-do를 입력해주세요!')
        }
      )
    },
    resetFields () {
      this.todo.title = "";
    },
  }
}
</script>

<style scope>

form {
  margin: 3em auto;
  width: 40em;
}

.deadline-field {
  margin: 0.5em auto;
  width: 20em;
}

.create-button {
  margin: 0.5em auto;
  width: 30em;
}

</style>