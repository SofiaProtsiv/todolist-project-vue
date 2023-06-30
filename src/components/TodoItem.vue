<script setup lang="ts">
import Draggable from "vuedraggable/src/vuedraggable.js";
import { type Todo, TodoStatus } from "@/types";
import useTodos from "@/store/useTodos";
import { PencilSquareIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import { ref } from "vue";

interface Props {
  todoList: Array<Todo>;
  status: TodoStatus;
}

const errorMessage = ref(null);
const props = defineProps<Props>();
const { deleteTodo, updateStatusTodo } = useTodos();

const handleInput = () => {
  errorMessage.value = null;
};

const onDraggableChange = (payload: any) => {
  if (payload?.added?.element?.status) {
    updateStatusTodo(payload?.added?.element, props.status);
  }
};

const handleToggleEditMode = (todo: Todo) => {
  if (todo.title.length === 0) {
    errorMessage.value = "An empty task cannot be saved";
    return;
  }
  todo.isEditMode = !todo.isEditMode;
};
</script>

<template>
  <Draggable class="draggable" :list="todoList" group="todos" itemKey="id" @change="onDraggableChange">
    <template #item="{ element: todo }">
      <div :class="{
        todoItem: true,
        [todo.isEditMode ? 'active' : '']: true,
      }">
        <label>
          <input @input="handleInput" v-model="todo.title" :disabled="!todo.isEditMode" type="text" :class="{
            'todoItem__input': true,
            [errorMessage ? 'error' : '']: true,
          }" />
          <p class="todoItem__errorMessage">{{ errorMessage }}</p>
        </label>
        <textarea v-if="todo.isEditMode || todo.description" v-model="todo.description" :disabled="!todo.isEditMode"
          class="todoItem__description">{{ todo.description }}</textarea>

        <button type="button" class="todoItem__delete-button" @click="deleteTodo(todo)">
          <XMarkIcon class="icon" />
        </button>
        <button type="button" class="todoItem__edit-button" @click="handleToggleEditMode(todo)">
          {{ todo.isEditMode ? "Save" : "Edit" }}
          <PencilSquareIcon class="icon" />
        </button>
      </div>
    </template>
  </Draggable>
</template>

<style scoped lang="scss">
.todoItem {
  margin-right: 0.25rem;
  max-width: 300px;
  padding: 0.5rem;
  color: #172b4d;
  background-color: white;
  border-radius: 0.25rem;
  box-shadow: 0px 1px 1px #091e4240, 0px 0px 1px #091e424f;
  cursor: pointer;
  transition: background-color 250ms cubic-bezier(0.075, 0.82, 0.165, 1);
  &.active {
    border: 1px solid #6281ff;
  }
  &:hover{
    background-color: #f4f4f4;
  }
}
.draggable {
  max-height: 70vh;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.todoItem__input,
.todoItem__description {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  outline: none;
  color: #172b4d;
  background-color: white;
  border: 1px solid #cccccc;
  border-radius: 0.25rem;

  &::placeholder {
    color: #b1b1b1;
  }

  &:disabled {
    background-color: transparent;
    border: none;
    font-size: 1rem;
  }
}

.todoItem__input {
  margin-top: 1.25rem;
}

.todoItem__errorMessage {
  color: red;
  font-weight: 500;
  font-size: .75rem;
  margin-bottom: 0.5rem;
}

.todoItem__description {
  resize: vertical;
}

.todoItem__edit-button {
  display: flex;
  align-items: center;
  align-self: flex-end;
  margin-left: auto;
  gap: 0.5rem;
  background-color: transparent;
  border: none;
  cursor: pointer;

  &.active {
    color: #6281ff;
  }
}

.todoItem__delete-button {
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;

  background-color: transparent;
  border: none;
  cursor: pointer;
}

.icon {
  width: 1.25rem;
  height: 1.25rem;
}
</style>
