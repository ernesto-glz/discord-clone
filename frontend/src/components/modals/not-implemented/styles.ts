import styled from 'styled-components';

export const Base = styled.div`
  opacity: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 4px;
  margin: 0 auto;
  position: relative;
  background-color: var(--modal-background);
  width: 440px;
  max-height: 720px;
  min-height: 200px;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 24px;
  padding-bottom: 24px;
  > .title {
    font-weight: 600;
    font-size: 24px;
    line-height: 30px;
    color: var(--header-primary);
  }
  > .description {
    color: var(--header-secondary);
    margin-top: 8px;
    font-size: 16px;
    line-height: 20px;
  }
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: var(--background-secondary);
  border-radius: 4px;
`;

export const Button = styled.button`
  color: #fff;
  background-color: var(--brand-experiment);
  box-sizing: border-box;
  width: auto;
  height: 32px;
  min-width: 90px;
  min-height: 32px;
  cursor: pointer;
  &:hover {
    background-color: var(--brand-experiment-560);
  }
`;
