import styled from 'styled-components';

export interface LoadingProps {
  isVisible: boolean;
}

export const Container = styled.div<LoadingProps>`
  display: ${(props) => (props.isVisible ? 'visible' : 'none !important')};
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #2f3136;
  z-index: 3000;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  > h4 {
    text-transform: uppercase;
    font-size: 13px;
    line-height: 20px;
  }
  > p {
    margin-top: 5px;
    max-width: 300px;
    color: var(--header-secondary);
    font-size: 17px;
    line-height: 21px;
    text-align: center;
  }
`;

export const LoadingSpinner = styled.video`
  width: 200px;
  height: 200px;
`;
