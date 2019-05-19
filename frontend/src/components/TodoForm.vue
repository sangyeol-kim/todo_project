<template>
    <!-- 글 생성하는 폼 -->
    <form class="create-form">
      <!-- To-do title field -->
      <div>
        <b-field>
          <b-input 
            class="title-field"
            v-model="todo.title"
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
            icon="far fa-calendar-alt"
            size="is-medium"
            :min-date="minDate">
          </b-datepicker>
        </b-field>
      </div>
      <!-- To-do priority field -->
      <div class="priority-group">
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
        <strong>등록하기</strong>
      </b-button>
    </form>
</template>

<script>
import axios from 'axios'
import { Snackbar } from 'buefy/dist/components/snackbar'

export default {
  data () {
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
    create () {
      axios.post('/api/todos/create', this.todo)
      .then(
        (response) => {
          this.$emit("create", response.data)
          this.resetField()
        },
        (err) => {
          console.error(err)
          this.warning('할 일을 입력해주세요!')
      })
    },
    // Create 이후 Form State를 Reset하는 코드
    resetField () {
      this.todo.title = ""
      this.todo.priority = ""
      this.todo.deadline = ""
    },
    warning(messages) {
      this.$snackbar.open({
        duration: 2000,
        message: `${messages}`,
        type: 'is-warning',
        position: 'is-top',
      })
    },
  }
}
</script>

<style scope>

.title-field {
  margin: 0 auto;
  width: 40em;
}

.deadline-field {
  margin: 0 auto;
  width: 23em;
}

.priority-group {
  margin-top: 0.5em;
}

.create-button {
  margin: 0 auto;
  width: 15em;
}

</style>