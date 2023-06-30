import { reactive, computed, watch } from "vue";
import type { Todo, TodoStatus, TodoStore } from "@/types";
import createDefaultValues from "@/utils/createDefaultValues";

const todoStore = reactive<TodoStore>(createDefaultValues());

watch(todoStore, (updatedTodoStore) => {
  localStorage.setItem("todos", JSON.stringify(updatedTodoStore));
});

export default () => {
  const getTodosByStatus = (todoStatus: TodoStatus) => {
    return computed(() => todoStore[todoStatus]);
  };

  const updateStatusTodo = (todo: Todo, newStatus: TodoStatus) => {
    todo.status = newStatus;
  };

  const editTodo = (todo: Todo, newTitle: string) => {
    todo.title = newTitle;
  };

  const addNewTodo = (todo: Todo) => {
    todoStore[todo.status].push(todo);
  };

  const deleteTodo = (todoToDelete: Todo) => {
    todoStore[todoToDelete.status] = todoStore[todoToDelete.status].filter(
      (todo) => todo.id !== todoToDelete.id
    );
  };

  return {
    getTodosByStatus,
    addNewTodo,
    deleteTodo,
    updateStatusTodo,
    editTodo,
  };
};
