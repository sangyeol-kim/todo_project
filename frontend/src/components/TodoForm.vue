<template>
    <!-- 글 생성하는 폼 -->
    <form class="create-form">
      <!-- To-do title field -->
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
      <!-- To-do deadline field -->
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
      <!-- To-do priority field -->
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
      <!-- Create button -->
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
    // 현재 Date를 기준으로 Datepicker에서 선택할 수 있는 날짜 범위를 지정하기 위한 코드
    const today = new Date()
    return {
      todo: {},
      date: new Date(),
      minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
    }
  },
  methods: {
    // Create button을 클릭했을 때 호출되는 api
    create: function() {
      this.$http.post('/api/todos/create', this.todo)
      .then(
        (response) => {
          this.$emit("create", response.data)
          this.resetField()
        },
        (err) => {
          console.error(err)
          alert('To-do를 입력해주세요!')
      })
    },
    // Create 이후 Form State를 Reset하는 코드
    resetField () {
      this.todo.title = "";
    },
  }
}
</script>

<style scope>

.create-form {
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