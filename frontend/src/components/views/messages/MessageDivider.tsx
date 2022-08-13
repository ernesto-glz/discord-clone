import React from 'react';
import { format } from 'date-fns';

type Props = { date: string };

export const MessageDivider: React.FC<Props> = ({ date }) => {
  const dateString = format(new Date(date), 'MMMM dd, yyy');

  return (
    <div className="message-divider" role="separator" aria-label={dateString}>
      <span>{dateString}</span>
    </div>
  );
};
