<script setup lang="ts">
import { TodoStatus } from "@/types";
import TodoGroup from "./TodoGroup.vue";
</script>

<template>
  <ul class="groupsWrapper">
    <TodoGroup :status="TodoStatus.Pending" />
    <TodoGroup :status="TodoStatus.InProgress" />
    <TodoGroup :status="TodoStatus.Completed" />
  </ul>
</template>

<style lang="scss" scoped>
.groupsWrapper {
  display: flex;
  justify-content: space-around;
  gap: 1.5rem;
  padding: 0;
  list-style: none;
}
</style>
