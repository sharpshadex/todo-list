import styled from 'styled-components';

export const Ul = styled.ul`
  list-style: none;
  margin: 0;
  width: 100%;
  max-height: 30em;
  overflow-y: auto;
  padding: 0 1em;
  @media (max-width: 480px) {
    max-height: calc(100vh - 300px);
  }
`;

export const Wrapper = styled.div`
  padding: 0;
  margin: 0;
  width: 100%;
  background-color: white;
  border-radius: 3px;
  overflow: hidden;
`;
