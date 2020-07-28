import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper, QR } from './styles';

function Connector({ userToken }) {
  const targetURL = `https://chart.googleapis.com/chart?cht=qr&chs=150x150&chl=${
    window.location.href
  }${userToken}`;
  return (
    <Wrapper>
      <QR src={targetURL} />
    </Wrapper>
  );
}

Connector.propTypes = {
  userToken: PropTypes.string,
};

export default Connector;
