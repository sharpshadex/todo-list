import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  width: 150px;
  height: 150px;
  position: fixed;
  bottom: 25px;
  left: 25px;
  transition: 500ms all ease;
  &:hover {
    width: 300px;
    height: 300px;
  }
  @media (max-width: 480px) {
    display: none;
  }
`;

export const QR = styled.img`
  display: inline-block;
  width: 100%;
`;
