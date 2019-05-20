<template>
  <!-- 글 수정하는 폼 -->
  <div class="container">
    <div class="edit-title">등록된 To-do를 수정해보세요!</div>
    <form class="edit-form">
      <!-- To-do title edit field -->
      <div>
        <b-field class="title-field">
          <b-input 
            v-model="todo.title"
            icon="fas fa-list-ul"
            size="is-large">
          </b-input>
        </b-field>
      </div>
      <!-- To-do deadline edit field -->
      <div>
        <b-field class="deadline-field">
          <b-datepicker
            v-model="todo.deadline"
            open-on-focus="false"
            size="is-medium"
            date-parser="dateParser"
            :min-date="minDate">
          </b-datepicker>
        </b-field>
      </div>
      <!-- To-do priority edit field -->
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
      <!-- Update button -->
      <div class="button-group">
        <b-button class="update-button"
          v-on:click.prevent="update(todo._id)" 
          type="is-primary">
          <strong>수정하기</strong>
        </b-button>
        <!-- To-do List로 이동하는 버튼 -->
        <router-link :to="{ name: 'Todos'}" class="back-button">
          <b-button
            type="is-primary">
            <strong>뒤로 가기</strong>
          </b-button>
        </router-link>
      </div>
    </form>
  </div>
</template>


<script>
import axios from 'axios'
import moment from 'moment'
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
  // 수정을 원하는 To-do의 정보를 가져오는 api
  created () {
    let id = this.$route.params.id
    axios.get(`/api/todos/edit/${id}`)
    .then((response) => {
      this.todo = response.data
    },
    (err) => {
      console.error(err)
      this.warning('To-do를 불러오는데 실패했습니다. 다시 시도해주세요!')
    })
  },
  methods: {
    // Update button을 클릭했을 때 호출되는 api
    dateParser(date) {
      return new Date(Date.parse(date))
    },
    update (id) {
      axios.put(`/api/todos/${id}`, this.todo)
      .then(
        (response) => {
          this.$router.push('/')
        },
        (err) => {
          console.error(err)
          this.warning('수정에 실패했습니다. 다시 시도해주세요!')
        }
      )
    },
    moment (day) {
      return moment(day).format('YYYY-MM-DD');
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

  .edit-title {
    margin-top: 6em;
    margin-bottom: 1em;
    font-size: 2.5em;
    font-family: 'yg-jalnan';
  }
  .edit-form {
    font-family: "BMHANNAPro";
  }
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
  .button-group {
    margin-top: 1em;
  }
  .update-button {
    width: 5em;
  }

</style>
