import produce from 'immer';
import { SET_TASKS, SET_LOADING, SET_ERROR } from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  tasks: [],
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_TASKS:
        draft.loading = false;
        draft.tasks = action.tasks;
        break;
      case SET_LOADING:
        draft.loading = action.loading;
        break;
      case SET_ERROR:
        draft.error = action.error;
        break;
    }
  });

export default homeReducer;
