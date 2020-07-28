import produce from 'immer';
import { SET_USER_TOKEN } from '../HomePage/constants';

export const generateUserToken = () => {
  let userToken = localStorage.getItem('userToken');
  if (!userToken) {
    userToken = Math.random()
      .toString(36)
      .slice(2);
    localStorage.setItem('userToken', userToken);
  }
  return userToken;
};

export const initialState = {
  status: true,
  userToken: generateUserToken(),
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_USER_TOKEN:
        draft.userToken = action.userToken;
        localStorage.setItem('userToken', action.userToken);
        break;
      default:
        break;
    }
  });

export default appReducer;
