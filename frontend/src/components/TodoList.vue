<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <h1 class="list-title">나만의 To-Do를 관리해보세요!</h1>
        <!-- TodoForm.vue 컴포넌트 추가 -->
        <todo-form @create="create"/>
        <hr>
        <!-- To-do List 테이블 -->
        <b-table 
          :data="todos"
          :paginated="isPaginated"
          :per-page="perPage"
          :current-page.sync="currentPage"
          :pagination-simple="isPaginationSimple"
          :hoverable="true">
          <template slot-scope="props">
            <!-- Complete 상태 Checkbox -->
            <b-table-column centered="true" field="completed" label="완료">
              <input type="checkbox" 
                v-model="props.row.complete" 
                @change="completed(props.row._id)">
            </b-table-column>
            <!-- 우선순위 -->
            <b-table-column centered="true" field="priority" label="우선순위" sortable>
              <!-- priority 값에 따른 아이콘 색깔 변경 -->
              <b-icon v-if="props.row.priority===1" type="is-danger" pack="fas" icon="fas fa-exclamation" size="is-small"></b-icon>
              <b-icon v-else-if="props.row.priority===2" type="is-warning" pack="fas" icon="fas fa-exclamation" size="is-small"></b-icon>
              <b-icon v-else-if="props.row.priority===3" type="is-dark" pack="fas" icon="fas fa-exclamation" size="is-small"></b-icon>
            </b-table-column>
            <!-- To-do 제목 -->
            <b-table-column centered="true" field="title" label="DO!">
                <del v-if="props.row.complete"><strong>{{props.row.title}}</strong></del>
                <strong v-else>{{props.row.title}}</strong>
            </b-table-column>
            <!-- 데드라인 -->
            <b-table-column centered="true" field="deadline" label="데드라인" sortable>
              <!-- 현재 Date와 비교하여 데드라인이 지난 To-do를 표시 -->
              <span v-if="props.row.deadline === null">데드라인 없음</span>
              <span 
                v-else-if="(moment(today) > moment(props.row.deadline))">
                <b-icon
                  class="fas fa-dizzy"
                  type="is-danger">
                </b-icon> 마감!!
              </span>
              <span v-else>
                {{moment(props.row.deadline)}}
              </span>
            </b-table-column>
            <!-- 수정, 삭제 버튼 -->
            <b-table-column centered="true" field="deadline" label="버튼">
              <router-link :to="{ name: 'Edit', params: { id: props.row._id }}">
                <b-icon class="far fa-edit"></b-icon>
              </router-link>
              <b-icon
                class="far fa-trash-alt"
                @click.native="deleteTodo(props.row._id)">
              </b-icon>
            </b-table-column>
          </template>
        </b-table>
        <hr>
      </div>
    </div>
  </section>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
import { Snackbar } from 'buefy/dist/components/snackbar'

import TodoForm from './TodoForm';

export default {
  data () {
    return {
      todos: {},
      today: new Date(),
      isPaginated: true,
      isPaginationSimple: false,
      currentPage: 1,
      perPage: 10
    }
  },
  created () {
    // 모든 To-do 가져오는 코드
    axios.get('/api/todos')
    .then((response) => {
      this.todos = response.data
    },
    (err) => {
      console.error(err)
      this.warning('To-do를 가져오는데 실패했습니다. 다시 시도해주세요!')
    })
  },
  components: {
    TodoForm,
  },
  methods: {
    // TodoForm.vue에서 글을 생성했을 때 Todos List State를 변경하는 코드
    create (payload) {
      this.todos.push(payload)
    },
    // 삭제 버튼을 클릭했을 때 api 호출 이후 Todos List State를 변경하는 코드
    deleteTodo (id) {
      const targetIndex = this.todos.findIndex(v => v._id === id)
      axios.delete(`/api/todos/${id}`)
      .then((response) => {
        this.todos.splice(targetIndex, 1)
      },
      (err) => {
        console.error(err)
        this.warning('삭제에 실패했습니다. 다시 시도해주세요!')
      })
    },
    // Complete Checkbox를 클릭했을 때 호출되는 api
    completed (id) {
      axios.put(`/api/todos/complete/${id}`)
      .catch(err => {
        console.error(err)
        this.warning('완료 체크에 실패했습니다. 다시 시도해주세요!')
      })
    },
    // Module Dependency를 줄이기 위해서 Vue.prototype이 아닌 method로 작성.
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
  .container {
    font-family: "BMHANNAPro";
  }
  a {
    color: black;
  }
  del {
    color: red;
  }
  .list-title {
    margin-top: 0.2em;
    margin-bottom: 0.8em;
    font-size: 2.5em;
    font-family: 'yg-jalnan';
  }

</style>