<template>
  <div class="e404">
    <h1 class="title-404">잘못된 경로입니다. 칰</h1>
    <router-link :to="{ name: 'Todos'}" class="button-404">
      <b-button
        type="is-primary"
        size="is-large">
        메인으로 가기
      </b-button>
    </router-link>
  </div>
</template>

<style scope>
  .e404 {
    margin: 15em auto;
    font-family: "BMHANNAPro";
  }
  .title-404 {
    font-size: 8em;
  }
  .button-404 {
    margin-top: 3em;
  }
</style>