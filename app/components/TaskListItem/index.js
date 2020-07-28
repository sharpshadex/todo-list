import React from 'react';
import PropTypes from 'prop-types';

import ListItem from 'components/ListItem';
import { Wrapper, Name, ToggleBox, DeleteIcon } from './styles';

const TaskListItem = (onToggleClick, onDeleteClick) => props => {
  const { item } = props;

  // Put together the content
  const content = (
    <Wrapper>
      <ToggleBox status={item.status} onClick={() => onToggleClick(item)} />
      <Name status={item.status}>{item.name}</Name>
      <DeleteIcon onClick={() => onDeleteClick(item)} />
    </Wrapper>
  );

  // Render the content into a list item
  return <ListItem key={`task-list-item-${item.name}`} item={content} />;
};

TaskListItem.propTypes = {
  item: PropTypes.object,
};

export default TaskListItem;
