import styled from 'styled-components';

export const WelcomeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  margin: 20px;
  > h1 {
    font-weight: 700;
    margin: 8px 0;
    font-size: 34px;
    line-height: 40px;
  }
  > div {
    color: var(--header-secondary);
    font-size: 16px;
    line-height: 20px;
    font-weight: 300;
  }
`;
