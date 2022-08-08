import React from 'react';
import { Entity, RequestTypes } from '@discord/types';
import { useAppDispatch } from 'src/redux/hooks';
import { removeRequest, acceptRequest } from 'src/redux/states/requests';
import { Close, Check } from '@styled-icons/material';

interface Props {
  request: RequestTypes.Populated;
  requestUser: Entity.User;
  type: RequestTypes.Type;
}

export const RequestActionsItem: React.FC<Props> = ({ request, type }) => {
  const dispatch = useAppDispatch();

  const handleCancel = async () => {
    dispatch(removeRequest(request.id));
  };

  const handleAccept = async () => {
    dispatch(acceptRequest(request));
  };

  return (
    <div className="flex">
      {type === 'INCOMING' && (
        <div className="action-button" onClick={handleAccept}>
          <Check className="accept action-icon" />
        </div>
      )}
      <div className="action-button" onClick={handleCancel}>
        <Close className="cancel action-icon" />
      </div>
    </div>
  );
};
