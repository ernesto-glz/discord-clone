import styled from 'styled-components';
import { Add } from '@styled-icons/material';

export const Container = styled.div`
  grid-area: CL;
  display: flex;
  flex-direction: column;
  padding: 10px 9.5px 0 10px;
  background-color: var(--background-secondary);
`;

export const Category = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
  margin-top: 10px;
  padding-left: 10px;
  > span {
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: .02em;
    color: var(--gray);
  }
`;

export const AddCategoryIcon = styled(Add)`
  width: 21px;
  height: 21px;
  color: var(--interactive-normal);
  cursor: pointer;
`;
