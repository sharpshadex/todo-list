import React from 'react';
import PropTypes from 'prop-types';

import List from '../List';
import ListItem from '../ListItem';
import LoadingIndicator from '../LoadingIndicator';
import TaskListItem from '../TaskListItem';

function TasksList({ loading, error, tasks, onToggleClick, onDeleteClick }) {
  if (loading) {
    return <List component={LoadingIndicator} />;
  }

  if (error !== false) {
    const ErrorComponent = () => (
      <ListItem item="Something went wrong, please try again!" />
    );
    return <List component={ErrorComponent} />;
  }

  if (tasks !== false) {
    return (
      <List
        items={tasks}
        component={TaskListItem(onToggleClick, onDeleteClick)}
      />
    );
  }

  return null;
}

TasksList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  tasks: PropTypes.any,
  onToggleClick: PropTypes.any,
  onDeleteClick: PropTypes.any,
};

export default TasksList;
