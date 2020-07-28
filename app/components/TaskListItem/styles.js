import styled from 'styled-components';
import { COMPLETED } from '../../constants';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const ToggleBox = styled.div`
  cursor: pointer;
  width: 25px;
  height: 25px;
  margin-right: 16px;
  border: 1px solid #888;
  border-radius: 50%;
  position: relative;
  text-align: center;
  padding: 3px;

  ${props =>
    props.status === COMPLETED
      ? `
        &::after {
            content: '';
            background: url('/check.svg') no-repeat;
            width: 15px;
            height: 15px;
            display: inline-block;
            background-position: center;
            background-size: cover;
            margin-bottom: 1px;
        }
    `
      : ``}
`;

export const Name = styled.div`
  display: flex;
  width: 100%;
  user-select: none;
  ${props =>
    props.status === COMPLETED
      ? `
    text-decoration: line-through;
    `
      : ``}
`;

export const DeleteIcon = styled.div`
  display: flex;
  font-size: 25px;
  color: #af5b5e;
  cursor: pointer;

  &::after {
    content: '';
    background: url('/times.svg') no-repeat;
    width: 15px;
    height: 15px;
    display: inline-block;
    background-position: center;
    background-size: cover;
  }
`;
