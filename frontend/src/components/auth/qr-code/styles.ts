import styled from 'styled-components';

export const QRContainer = styled.div`
  width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
`;

export const QRBorder = styled.div`
  background-color: rgb(255, 255, 255);
  border-radius: 4px;
  padding: 8px;
`;

export const QRTitle = styled.h3`
  color: var(--white);
  font-weight: 600;
  margin-bottom: 8px;
  padding: 0px 30px;
  margin-top: 20px;
  font-size: 27px;
  line-height: 30px;
`;

export const QRDescription = styled.p`
  color: var(--header-secondary);
  font-weight: 400;
  font-size: 18px;
  line-height: 20px;
  > span {
    font-weight: 600;
  }
`;
