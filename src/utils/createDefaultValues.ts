import { TodoStatus } from "@/types";

const createDefaultValues = () => {
    const todosInLocalStorage = JSON.parse(localStorage.getItem("todos")!);
  
    const defaultVal = {
      [TodoStatus.Pending]: [],
      [TodoStatus.InProgress]: [],
      [TodoStatus.Completed]: [],
    };
  
    if (todosInLocalStorage) {
      return {
        [TodoStatus.Pending]: todosInLocalStorage.pending,
        [TodoStatus.InProgress]: todosInLocalStorage.inProgress,
        [TodoStatus.Completed]: todosInLocalStorage.completed,
      };
    }
  
    return defaultVal;
  };
  
  export default createDefaultValues;