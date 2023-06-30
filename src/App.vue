<script setup lang="ts">
import TodoList from "./components/TodoList.vue";
</script>

<template>
  <header>
    <h1>Todo Project</h1>
  </header>
  <main>
    <TodoList />
  </main>
  <footer>© 2023 Sofia Protsiv & SoftPro. All rights reserved </footer>
</template>

<style lang="scss" scoped>
header{
  flex: 0 0 auto;
}
main{
  flex: 1 0 auto;
}
footer{
  flex: 0 0 auto;
}
</style>
