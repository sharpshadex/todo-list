/* eslint-disable func-names */
import {
  call,
  put,
  all,
  take,
  fork,
  spawn,
  select,
  cancel,
  delay,
} from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import request from 'utils/request';
import { selectUserToken } from 'containers/App/selectors';
import io from 'socket.io-client';
import { setTasks, setError, setLoading, getTasks } from './actions';
import {
  GET_TASKS,
  CREATE_TASK,
  TOGGLE_TASK_STATUS,
  DELETE_TASK,
} from './constants';
import { UNFINISHED } from '../../constants';

const API_ENDPOINT = '/api/tasks/';

function connect() {
  const socket = io();
  return new Promise(resolve => {
    socket.on('connect', () => {
      resolve(socket);
      console.log('Socket connected');
    });
  });
}

function* read(socket) {
  let lastFork = false;
  const channel = yield call(subscribe, socket);
  while (true) {
    const action = yield take(channel);

    yield delay(500);

    if (action.type === GET_TASKS) {
      lastFork = yield fork(fetchTasks);
    }
  }
}

export function* subscribe(socket) {
  const userToken = yield select(selectUserToken());
  return new eventChannel(emit => {
    const updateTasks = () => emit(getTasks());
    socket.on(userToken, updateTasks);
    return () => {};
  });
}

export function* write(socket) {
  const userToken = yield select(selectUserToken());
  while (true) {
    const action = yield take([CREATE_TASK, TOGGLE_TASK_STATUS, DELETE_TASK]);
    socket.emit('task-updated', userToken);
  }
}

export function* flow() {
  const socket = yield call(connect);
  yield fork(read, socket);
  yield fork(write, socket);
}

function* fetchTasks() {
  try {
    const userToken = yield select(selectUserToken());
    const requestURL = `${API_ENDPOINT}?userToken=${userToken}`;
    yield put(setLoading(true));
    const response = yield call(request, requestURL);
    yield put(setTasks(response.tasks));
  } catch (err) {
    yield put(setError(err));
  }
}

function* taskWatcher() {
  while (true) {
    yield take([GET_TASKS]);
    yield fork(fetchTasks);
  }
}

function* createTask(taskName) {
  try {
    const userToken = yield select(selectUserToken());
    const requestURL = `${API_ENDPOINT}/create`;
    yield put(setLoading(true));
    const response = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: taskName,
        status: UNFINISHED,
        userToken,
      }),
    });
  } catch (err) {
    yield put(setError(err));
  }
}

function* createTaskWatcher() {
  while (true) {
    const action = yield take(CREATE_TASK);
    yield fork(createTask, action.taskName);
  }
}

function* toggleTaskStatus(taskId, status) {
  try {
    const requestURL = `${API_ENDPOINT}/toggle_status`;
    yield put(setLoading(true));
    const response = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status,
        taskId,
      }),
    });
  } catch (err) {
    yield put(setError(err));
  }
}

function* toggleTaskStatusWatcher() {
  while (true) {
    const action = yield take(TOGGLE_TASK_STATUS);
    yield fork(toggleTaskStatus, action.taskId, action.status);
  }
}

function* deleteTask(taskId) {
  try {
    const requestURL = `${API_ENDPOINT}/delete`;
    yield put(setLoading(true));
    const response = yield call(request, requestURL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        taskId,
      }),
    });
  } catch (err) {
    yield put(setError(err));
  }
}

function* deleteTaskWatcher() {
  while (true) {
    const action = yield take(DELETE_TASK);
    yield fork(deleteTask, action.taskId);
  }
}

export default function* rootSaga() {
  const watchers = [
    taskWatcher,
    createTaskWatcher,
    toggleTaskStatusWatcher,
    deleteTaskWatcher,
    flow,
  ];

  yield all(
    watchers.map(saga =>
      spawn(function*() {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            console.log(e);
          }
        }
      }),
    ),
  );
}
