import React from 'react';
import { RequestItem } from './RequestItem';
import { useAppSelector } from 'src/redux/hooks';
import { Image } from '../elements/Image';

export const PendingRequests: React.FC = () => {
  const requests = useAppSelector((s) => s.requests);

  if (requests.length) {
    return (
      <div className="friends-panel flex-column">
        <h2 className="list-title">PENDING - {requests.length}</h2>
        <ul className="list-body scrollerBase scroller">
          {requests.map((request, i) => (
            <RequestItem request={request} key={i} type={request.type!} />
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="friends-panel center">
      <Image className="wampus-image" src="/img/wampus/wampus_only.svg" />
      <p className="wampus-message">
        There are no pending friend requests. Here's Wampus for now.
      </p>
    </div>
  );
};
