<script setup>
import Header from '@/components/layout/Header.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div id="app">
    <Header />
    <div class="layout">
      <router-view class="router-content" />
    </div>
  </div>
</template>

<style scoped>
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css');

* {
  font-family: 'Pretendard Variable', sans-serif;
}

#app {
  width: 100%;
  min-height: 100vh;
  background-color: var(--tmt-color-background);
  display: flex;
  flex-direction: column;
}

.layout {
  flex: 1;
  padding: 64px 32px;
  display: flex;
  flex-direction: column;
  background-color: white;
  margin: 64px;
}

.router-content {
  flex: 1;
  width: 100%;
}
</style>
