import styled from 'styled-components';

export const Divider = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  margin-left: 25px;
  height: 0;
  border-top: thin solid var(--background-modifier-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex: 0 0 auto;
  pointer-events: none;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  > span {
    display: block;
    padding: 2px 4px;
    color: var(--text-muted);
    background: var(--background-primary);
    line-height: 13px;
    font-size: 12px;
    margin-top: -1px;
    font-weight: 600;
    border-radius: 8px;
  }
`;
