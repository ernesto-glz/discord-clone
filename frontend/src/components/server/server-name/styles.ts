import styled from 'styled-components';
import { ExpandMore } from '@styled-icons/material';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--secondary);
  padding: 0 11px 0 16px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 0px 0px;
  z-index: 2;
`;

export const Title = styled.h1`
  white-space: nowrap;
  font-size: 16px;
  font-weight: bold;
  color: var(--white);
`;

export const ExpendIcon = styled(ExpandMore)`
  width: 28px;
  height: 28px;
  color: var(--white);
  cursor: pointer;
`;

export const StartChatButton = styled.button`
  width: 100%;
  height: 28px;
  overflow: hidden;
  border-radius: 4px;
  background-color: var(--background-tertiary);
  box-shadow: none;
  color: var(--gray);
  text-align: left;
  text-overflow: ellipsis;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  white-space: nowrap;
  cursor: pointer;
  padding-left: 5px;
`;
