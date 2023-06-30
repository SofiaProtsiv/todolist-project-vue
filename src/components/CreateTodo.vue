<script setup lang="ts">
import { reactive, ref } from "vue";
import { TodoStatus, type Todo } from "@/types";
import useTodos from "@/store/useTodos";
import getUniqueId from "@/utils/getUniqueId";
import { PlusIcon, XMarkIcon } from "@heroicons/vue/24/solid";

interface Props {
  status: TodoStatus;
}

const props = defineProps<Props>();
const shouldDisplayForm = ref(false);
const errorMessage = ref(null);

const { addNewTodo } = useTodos();

const newTodo = reactive<Omit<Todo, "id">>({
  title: "",
  description: "",
  status: props.status,
  isEditMode: false,
});

const resetForm = () => {
  newTodo.title = "";
  newTodo.description = "";

  errorMessage.value = null;
  shouldDisplayForm.value = false;
};

const handleInput = () => {
  errorMessage.value = null;
};

const handleOnSubmit = () => {
  if (newTodo.title.length === 0) {
    errorMessage.value = "An empty task cannot be created";
    return;
  }

  addNewTodo({
    id: getUniqueId(),
    ...newTodo,
  });

  resetForm();
};
</script>

<template>
  <div
    :class="{
      createTodo__container: true,
      [shouldDisplayForm ? 'active' :'']: true,
    }"
  >
    <div
      class="createTodo__button-wrapper"
      v-if="!shouldDisplayForm"
      @click="shouldDisplayForm = !shouldDisplayForm"
    >
      <PlusIcon class="icon" />
      <button type="button" class="createTodo__button">
        Add new todo card
      </button>
    </div>
    <template v-else>
      <form
        class="createTodo__form"
        @submit.prevent="handleOnSubmit"
        @keydown.enter.exact.prevent="handleOnSubmit"
      >
        <label class="createTodo__form-label">
          <input
            @input="handleInput"
            type="text"
            autofocus
            placeholder="Enter todo title"
            v-model="newTodo.title"
            :class="{
              'createTodo__form-input': true,
              [errorMessage ? 'error' : '']: true,
            }"
          />
          <p class="createTodo__form-errorMessage">{{ errorMessage }}</p>
        </label>

        <div class="createTodo_buttons-container">
          <button class="createTodo__submit-button" type="submit">
            Create new todo
          </button>
          <button
            type="button"
            class="createTodo__cancel-button"
            @click="resetForm"
          >
            <XMarkIcon class="icon" />
          </button>
        </div>
      </form>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.createTodo__container {
  margin-top: 1rem;
  margin-right: 0.65rem;
  max-width: 300px;
  padding: 0.5rem;
  background-color: white;
  border-radius: 0.25rem;

  &.active {
    border: 1px solid #6281ff;
  }
}
.createTodo__button-wrapper {
  display: flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 250ms cubic-bezier(0.075, 0.82, 0.165, 1);
  &:hover {
    background-color: #efefef;
  }
}

.createTodo__button {
  color: #44546f;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
}
.createTodo__form {
}
.createTodo__form-label {
  margin-bottom: 0.5rem;
}
.createTodo__form-input {
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
  &.error {
    border: 1px solid red;
  }
}
.createTodo__form-errorMessage {
  margin-bottom: 0.5rem;
  color: red;
  font-size: 0.75rem;
  font-weight: 500;
}

.createTodo_buttons-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.createTodo__submit-button {
  padding: 0.25rem 0.75rem;
  background-color: #6281ff;
  color: #ebecf0;
  border-radius: 0.25rem;
  border: none;
  cursor: pointer;
  transition: background-color 250ms cubic-bezier(0.075, 0.82, 0.165, 1);
  &:hover {
    background-color: #9aaeff;
  }
}
.createTodo__cancel-button {
  padding: 0;
  height: 1.25rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
}
.icon {
  width: 1.25rem;
  height: 1.25rem;
  fill: #44546f;
}
</style>
