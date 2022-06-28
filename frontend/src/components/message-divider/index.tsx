import React from 'react';
import { getDate } from 'src/utils/date';
import { Divider } from './styles';

type Props = { date: string };

export const MessageDivider: React.FC<Props> = (props) => {
  return (
    <Divider>
      <span>{getDate(props.date)}</span>
    </Divider>
  );
};
