import React from 'react';
import PropTypes from 'prop-types';
import { Label, Wrapper } from './styles';

function Header(props) {
  const { labelText } = props;

  return (
    <Wrapper>
      <Label>{labelText}</Label>
    </Wrapper>
  );
}

Header.propTypes = {
  labelText: PropTypes.string,
};

export default Header;
