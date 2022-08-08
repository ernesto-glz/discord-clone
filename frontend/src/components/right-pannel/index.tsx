import React from 'react';
import {
  Container,
  EmptyCard,
  SectionContent,
  SectionSubTitle,
  SectionTitle
} from './styles';

const RightPanel: React.FC = () => (
  <Container>
    <SectionTitle>Active Now</SectionTitle>
    <EmptyCard>
      <SectionSubTitle>It's quiet for now...</SectionSubTitle>
      <SectionContent>
        When a friend starts an activity—like playing a game or hanging out on
        voice—we'll show it here!
      </SectionContent>
    </EmptyCard>
  </Container>
);

export default RightPanel;
