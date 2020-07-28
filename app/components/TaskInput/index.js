import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { InputWrapper, TextField, SubmitButton } from './styles';

function TaskInput({ onKeyDown }) {
  const [inputValue, setInputValue] = useState('');

  return (
    <InputWrapper>
      <TextField
        type="text"
        placeholder="Create a task"
        onKeyDown={event => onKeyDown(event, inputValue, setInputValue)}
        value={inputValue}
        onChange={({ target: { value } }) => setInputValue(value)}
      />
      <SubmitButton
        onClick={() => onKeyDown({ keyCode: 13 }, inputValue, setInputValue)}
      />
    </InputWrapper>
  );
}

TaskInput.propTypes = {
  onKeyDown: PropTypes.func,
};

export default TaskInput;
