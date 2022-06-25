import styled from 'styled-components';
import { ContextMenu, MenuItem } from 'react-contextmenu';
import { Link45deg } from '@styled-icons/bootstrap';

export const MyCtxMenu = styled(ContextMenu)`
  z-index: 9;
`;

export const CtxBody = styled.div`
  position: relative;
  box-sizing: border-box;
  display: flex;
  height: auto;
  min-width: 188px;
  max-width: 320px;
  max-height: calc(100vh - 32px);
  box-shadow: var(--elevation-high);
  background: var(--background-floating);
  border-radius: 4px;
  > div {
    display: flex;
    flex-direction: column;
    overflow: hidden auto;
    padding: 6px 8px;
    position: relative;
    box-sizing: border-box;
  }
`;

export const CtxItem = styled(MenuItem)`
  color: var(--interactive-normal);
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 32px;
  padding: 6px 8px;
  border-radius: 2px;
  min-width: 188px;
  max-width: 320px;
  cursor: pointer;
  > .childLeft {
    --webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
  }
  > .childRight {
    width: 18px;
    height: 18px;
  }
  &:hover {
    background-color: var(--brand-experiment-560);
  }
`;

export const Separator = styled.div`
  box-sizing: border-box;
  margin: 4px 5px;
  min-width: 188px;
  max-width: 320px;
  height: 1px;
  background-color: var(--background-modifier-accent);
`;

export const MessageLink = styled(Link45deg)`
  width: 18px;
  height: 18px;
`;
