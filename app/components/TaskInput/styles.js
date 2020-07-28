import styled from 'styled-components';

export const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TextField = styled.input`
  width: 100%;
  position: relative;
  margin: 0;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  color: inherit;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  padding: 16px 16px 16px;
  border: none;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
  outline: 0 none;
`;

export const SubmitButton = styled.a`
  text-decoration: none;
  color: #af5b5e;
  font-size: 32px;
  margin-right: 15px;
  cursor: pointer;
  &::after {
    content: '\\002B';
  }
`;
