<template>
  <div>
    <div class="top-title">
      <h1>나만의 To-Do를 관리해보세요!</h1>
    </div>
    <todo-form @create="create"/>
    <div class="wrapper">
      <hr>
      <b-table 
        :data="todos"
        :paginated="isPaginated"
        :per-page="perPage"
        :current-page.sync="currentPage"
        :pagination-simple="isPaginationSimple">

        <template slot-scope="props">
            <b-table-column field="completed" label="완료">
                <!-- <b-checkbox 
                  v-model="props.row.complete"
                  v-on:click="completed(props_row._id)">
                </b-checkbox> -->
                <input type="checkbox" 
                  v-model="props.row.complete" 
                  @change="completed(props.row._id)">
            </b-table-column>

            <b-table-column centered="true" field="priority" label="우선순위" sortable>
              <b-icon v-if="props.row.priority===1" type="is-danger" pack="fas" icon="fas fa-exclamation" size="is-small"></b-icon>
              <b-icon v-else-if="props.row.priority===2" type="is-warning" pack="fas" icon="fas fa-exclamation" size="is-small"></b-icon>
              <b-icon v-else-if="props.row.priority===3" type="is-dark" pack="fas" icon="fas fa-exclamation" size="is-small"></b-icon>
            </b-table-column>

            <b-table-column centered="true" field="title" label="DO!">
                <del v-if="props.row.complete"><strong>{{props.row.title}}</strong></del>
                <strong v-else>{{props.row.title}}</strong>
            </b-table-column>

            <b-table-column centered="true" field="deadline" label="데드라인" sortable>
                <span v-if="props.row.deadline === null">데드라인 없음</span>
                <span 
                  v-else-if="(moment(today).format('YYYY-MM-DD') > moment(props.row.deadline).format('YYYY-MM-DD'))">
                  <b-icon
                    class="fas fa-dizzy"
                    type="is-danger">
                  </b-icon> 마감!!
                </span>
                <span v-else>
                  {{moment(props.row.deadline).format('YYYY-MM-DD')}}
                </span>
            </b-table-column>

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
      <!-- <button class="button is-primary" @click="tip">
          사용법과 팁을 원하신다면 클릭해주세요!
      </button> -->
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import TodoForm from './TodoForm';

export default {
  data () {
    return {
      todos: {},
      today: new Date(),
      isPaginated: true,
      isPaginationSimple: false,
      currentPage: 1,
      perPage: 7
    }
  },
  created () {
    this.$http.get('/api/todos')
    .then((response) => {
      this.todos = response.data
    })
  },
  components: {
    TodoForm,
  },
  methods: {
    create (payload) {
      this.todos.push(payload)
    },
    deleteTodo (id) {
      const targetIndex = this.todos.findIndex(v => v._id === id)
      this.$http.delete(`/api/todos/${id}`)
      .then((response) => {
        this.todos.splice(targetIndex, 1)
      },
      (err) => {
        alert('삭제 에러')
      })
    },
    completed (id) {
      this.$http.put(`/api/todos/complete/${id}`)
      .then((response) =>{
        this.$router.push('/')
      },
      (err) => {
        alert('then error')
      })
    }
    // tip() {
    //   this.$dialog.alert({
    //     title: 'To-do 사용 방법',
    //     message: `<ul>
    //                 <li> <i class="far fa-hand-holding"></i> 우선순위와 데드라인을 클릭하면 <b>정렬된 결과</b>를 볼 수 있습니다. 기본 정렬은 글을 작성한 날짜 순입니다. </li>
    //                 <li> <i class="far fa-hand-holding"></i> 체크박스를 통해 <b>완료한 To-do</b>를 표시할 수 있습니다. </li>
    //                 <li> <i class="far fa-hand-holding"></i> 우선순위를 통해 <b>색깔별로 중요도</b>를 선택할 수 있습니다. </li>
    //                 <li> <i class="far fa-hand-holding"></i> 데드라인이 초과된 To-do는 <b>무서운</b> 이모티콘과 함께 <b>경고</b>가 표시됩니다. </li> 
    //                 <li> <i class="far fa-hand-holding"></i> 수정 버튼을 클릭하면 할 일, 우선순위, <b>데드라인을 변경</b>할 수 있습니다. </li> 
    //                 <li> <i class="far fa-hand-holding"></i> 삭제된 글은 복구가 <b>불가능</b>합니다. </li> <br />

    //                 <i class="far fa-address-card"></i> 개발한 사람: 김상열 <br />
    //                 Facebook: <a href="https://www.facebook.com/twysg"  target="_blank">https://www.facebook.com/twysg</a> <br />
    //                 github: <a href="https://github.com/sangyeol-kim"  target="_blank">https://github.com/sangyeol-kim</a> <br />
    //                 phone: 010-2321-6662 <br /> <br />
    //               </ul>

    //               감사합니다. 행복하세요! <i class="far fa-kiss-wink-heart"></i>
    //               `,
    //     confirmText: 'Close'
    //   })
    // },
  }
}
</script>

<style scope>
  .wrapper {
    font-family: "BMHANNAPro";
    margin-left: 30em;
    margin-right: 30em;
  }
  a {
    color: black;
  }

  del {
    color: red;
  }
  .top-title {
    margin-top: 1em;
    margin-left: 10em;
    margin-right: 10em;
    /* font-family: "BMHANNAPro"; */
    font-size: 2.5em;
    font-family: 'yg-jalnan';
  }

</style>