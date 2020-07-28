import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import TasksList from 'components/TasksList';
import {
  getTasks,
  createTask,
  toggleTaskStatus,
  deleteTask,
  setUserToken,
} from './actions';
import { selectTasks, selectLoading, selectError } from './selectors';
import { selectUserToken } from '../App/selectors';
import reducer from './reducer';
import saga from './saga';
import { Container } from './styles';
import TaskInput from '../../components/TaskInput';
import { COMPLETED, UNFINISHED } from '../../constants';
import Connector from '../../components/Connector';
const key = 'home';

export function HomePage(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const {
    loading,
    error,
    tasks,
    getTasks,
    createTask,
    toggleTaskStatus,
    deleteTask,
    setUserToken,
    userToken,
  } = props;

  useEffect(() => {
    if (props.match.params.userToken) {
      setUserToken(props.match.params.userToken);
    }
    getTasks();
  }, []);

  const handleOnKeyDown = (event, inputValue, setInputValueCallback) => {
    if (!inputValue) {
      return;
    }
    if (event.keyCode === 13) {
      createTask(inputValue);
      setInputValueCallback('');
    }
  };

  const handleOnToggleClick = item => {
    const newStatus = item.status === COMPLETED ? UNFINISHED : COMPLETED;
    toggleTaskStatus(item._id, newStatus);
  };

  const handleOnDeleteClick = item => {
    deleteTask(item._id);
  };

  const taskListProps = {
    loading,
    error,
    tasks,
    onToggleClick: handleOnToggleClick,
    onDeleteClick: handleOnDeleteClick,
  };

  return (
    <Container>
      <Helmet>
        <title>ToDo List</title>
        <meta name="description" content="Basic ToDo Task List" />
      </Helmet>
      <TaskInput onKeyDown={handleOnKeyDown} />
      <TasksList {...taskListProps} />
      <Connector userToken={userToken} />
    </Container>
  );
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  tasks: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  getTasks: PropTypes.func,
  createTask: PropTypes.func,
  toggleTaskStatus: PropTypes.func,
  deleteTask: PropTypes.func,
  setUserToken: PropTypes.func,
  userToken: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  tasks: selectTasks(),
  loading: selectLoading(),
  error: selectError(),
  userToken: selectUserToken(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { getTasks, createTask, toggleTaskStatus, deleteTask, setUserToken },
    dispatch,
  );
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
