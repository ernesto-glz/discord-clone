import styled from "styled-components";

export const ItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  > .leftSide {
    > h5 {
      color: var(--header-secondary);
      margin-bottom: 4px;
      font-size: 12px;
      line-height: 16px;
      font-weight: 600;
    }
  }
`;

export const Value = styled.div`
  color: var(--header-primary);
  > .discrim {
    color: var(--header-secondary);
  }
  > span > button {
    background-color: transparent;
    color: var(--text-link);
    cursor: pointer;
    width: auto;
    height: auto;
    padding: 2px 4px;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const EditButton = styled.button`
  color: #fff;
  background-color: var(--button-secondary-background);
  height: 32px;
  min-width: 60px;
  min-height: 32px;
  cursor: pointer;
`;