import {
  GET_TASKS,
  SET_TASKS,
  SET_LOADING,
  SET_ERROR,
  CREATE_TASK,
  TOGGLE_TASK_STATUS,
  DELETE_TASK,
  SET_USER_TOKEN,
} from './constants';

export function getTasks() {
  return {
    type: GET_TASKS,
  };
}

export function setTasks(tasks) {
  return {
    type: SET_TASKS,
    tasks,
  };
}

export function setLoading(loading) {
  return {
    type: SET_LOADING,
    loading,
  };
}

export function setError(error) {
  return {
    type: SET_ERROR,
    error,
  };
}

export function createTask(taskName) {
  return {
    type: CREATE_TASK,
    taskName,
  };
}

export function toggleTaskStatus(taskId, status) {
  return {
    type: TOGGLE_TASK_STATUS,
    taskId,
    status,
  };
}

export function deleteTask(taskId) {
  return {
    type: DELETE_TASK,
    taskId,
  };
}

export function setUserToken(userToken) {
  return {
    type: SET_USER_TOKEN,
    userToken,
  };
}
