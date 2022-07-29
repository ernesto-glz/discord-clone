import React from 'react';
import { getDate } from 'src/utils/date';
import { Divider } from './styles';

type Props = { date: string };

export const MessageDivider: React.FC<Props> = ({ date }) => {
  return (
    <Divider>
      <span>{getDate(date)}</span>
    </Divider>
  );
};
