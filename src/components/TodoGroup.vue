<script setup lang="ts">
import { TodoStatus } from "@/types";
import useTodos from "@/store/useTodos";
import TodoItem from "./TodoItem.vue";
import CreateTodo from "./CreateTodo.vue";

interface Props {
  status: TodoStatus;
}

const props = defineProps<Props>();

const { getTodosByStatus } = useTodos();
const todoList = getTodosByStatus(props.status);

const groupLabel = {
  [TodoStatus.Pending]: "Pending",
  [TodoStatus.InProgress]: "In Progress",
  [TodoStatus.Completed]: "Completed",
};
</script>

<template>
  <div class="group__wrapper">
    <h3 class="group__title">{{ groupLabel[props.status] }}</h3>
    <span :class="{'group__statistics':true, [props.status]: true}">{{ todoList.length }}</span>
    <TodoItem :todoList="todoList" :status="props.status" />

    <CreateTodo :status="props.status" />
  </div>
</template>

<style lang="scss" scoped>
.group__wrapper {
  position: relative;
  padding: 1rem 0.25rem 1rem 0.75rem;
  background-color: #fafafa;
  width: 300px;
  border-radius: 1rem;
  box-shadow: 0px 1px 1px #091e4240, 0px 0px 1px #091e424f;
  height: fit-content;
}

.group__title {
  margin-bottom: 1rem;
  padding-left: 0.5rem;
  font-weight: 700;
  font-size: 1rem;
  color: #172b4d;
  text-transform: uppercase;
}
.group__statistics{
  position: absolute;
    top: 0.5rem;
    right: 0.75rem;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    font-weight: 500;
    &.pending{
      background-color: #848484;
      color: white;
    }
    &.inProgress{
      background-color: #fcff7d;
    }
    &.completed{
      background-color: #96f848;
    }
}
</style>
