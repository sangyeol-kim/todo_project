<template>
  <div class="app">
    <div class="container">
      <div class="row header">
        <h1 class="col s6 offset-s3 center-align teal-text">To-Do List!</h1>
      </div>
      <div class="row">
        <form @submit.prevent="create" class="col s6 offset-s3">
          <div class="input-field">
            <i class="material-icons prefix">list</i>
            <!-- <textarea v-model="newTodo" id="icon_prefix2" class="materialize-textarea"></textarea> -->
            <todo-form/>
            <label for="icon_prefix2">What to do?</label>
          </div>
          <button class="btn waves-effect col s12">Add</button>
        </form>
      </div>
      <div class="row">
        <ul class="collection col s6 offset-s3">
          <li class="collection-item" v-for="todo in todos" :key="todo.id">
            <p>
              <label>
                <input type="checkbox" :checked=todo.done @change="todo.done = !todo.done" />
                <span>{{todo.title}}</span>
                <span>
                  <a @click.prevent="deleteTodo(todo)">
                    <i class="material-icons right teal-text">delete</i>
                  </a>
                </span>
              </label>
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>