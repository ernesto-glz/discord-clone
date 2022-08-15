import styled from 'styled-components';

export const Base = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 4px;
  position: relative;
  background-color: var(--modal-background);
  width: 440px;
  max-height: 720px;
  min-height: 200px;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 16px;
  > .title {
    font-weight: 600;
    font-size: 22px;
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
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 16px;
  background-color: var(--background-secondary);
  height: 70px;
  border-radius: 4px;
`;

export const CancelButton = styled.button`
  color: #fff;
  background-color: transparent;
  box-sizing: border-box;
  width: auto;
  height: 32px;
  min-width: 60px;
  min-height: 32px;
  padding: 2px 24px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export const LogoutButton = styled.button`
  color: #fff;
  background-color: var(--button-danger-background);
  box-sizing: border-box;
  width: auto;
  height: 32px;
  min-width: 60px;
  min-height: 32px;
  cursor: pointer;
  &:hover {
    background-color: var(--button-danger-background-hover);
  }
`;
