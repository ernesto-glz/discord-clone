import styled from 'styled-components';

export const Container = styled.div`
  grid-area: RP;
  display: flex;
  flex-direction: column;
  padding: 3px 6px 0 16px;
  background-color: var(--background-primary);
  border-left: 1px solid var(--background-modifier-accent);
  max-height: calc(100vh - 46px);
  overflow-y: scroll;

  min-width: 360px;
  max-width: 360px;

  ::-webkit-scrollbar {
    width: 4px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: var(--tertiary);
    border-radius: 4px;
  }
  ::-webkit-scrollbar-track {
    background-color: var(--secondary);
  }

  @media (max-width: 1200px) {
    display: none;
  }
`;

export const SectionTitle = styled.h3`
  margin: 8px 0 16px;
  font-weight: 700;
  font-size: 24px;
  line-height: 24px;
`;

export const EmptyCard = styled.div`
  text-align: center;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const SectionSubTitle = styled.h5`
  margin-bottom: 4px;
  font-size: 18px;
  line-height: 20px;
  font-weight: 600;
`;

export const SectionContent = styled.div`
  font-size: 16px;
  line-height: 18px;
  color: var(--senary);
`;
