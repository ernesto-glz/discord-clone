import styled from 'styled-components';

export const Button = styled.button`
  color: #fff;
  background-color: var(--brand-experiment);
  font-size: 16px;
  line-height: 24px;
  width: 100%;
  height: 44px;
  min-width: 130px;
  min-height: 44px;
  border: none;
  border-radius: 3px;
  font-weight: 500;
  cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointer'};
  &:hover {
    background-color: var(--brand-experiment-560);
  }
`;
