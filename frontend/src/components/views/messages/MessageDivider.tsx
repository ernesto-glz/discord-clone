import React from 'react';
import { getDate } from 'src/utils/date';

type Props = { date: string };

export const MessageDivider: React.FC<Props> = ({ date }) => {
  const dateString = getDate(date);

  return (
    <div className="message-divider" role="separator" aria-label={dateString}>
      <span>{dateString}</span>
    </div>
  );
};
