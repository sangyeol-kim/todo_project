<template>
  <!-- 등록된 뷰 라우터 이외의 경로로 접근했을 때 발생시키는 404 page-->
  <div class="container">
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
  </div>
</template>

<style scope>
  .e404 {
    margin-top: 15em;
    font-family: "BMHANNAPro";
  }
  .title-404 {
    font-size: 8em;
  }
</style>