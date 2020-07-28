/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => state.home || initialState;

const selectTasks = () =>
  createSelector(
    selectHome,
    homeState => homeState.tasks,
  );

const selectLoading = () =>
  createSelector(
    selectHome,
    homeState => homeState.loading,
  );

const selectError = () =>
  createSelector(
    selectHome,
    homeState => homeState.error,
  );

export { selectHome, selectTasks, selectError, selectLoading };
