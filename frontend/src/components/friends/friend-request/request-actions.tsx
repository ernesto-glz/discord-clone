import React from 'react';
import { Entity } from '@discord/types';
import { useAppDispatch } from 'src/redux/hooks';
import { removeRequest, acceptRequest } from 'src/redux/states/requests';
import {
  AcceptIcon,
  ActionButton,
  CancelIcon,
  RequestActions
} from '../styles';

interface Props {
  requestId: string;
  requestUser: Entity.User;
  type: Entity.RequestTypes.Type;
}

export const RequestActionsItem: React.FC<Props> = ({ requestId, type }) => {
  const dispatch = useAppDispatch();

  const handleCancel = async () => {
    dispatch(removeRequest(requestId));
  };

  const handleAccept = async () => {
    dispatch(acceptRequest(requestId));
  };

  return (
    <RequestActions>
      {type === 'OUTGOING' ? (
        <ActionButton onClick={handleCancel}>
          <CancelIcon className="cancel" />
        </ActionButton>
      ) : (
        <>
          <ActionButton onClick={handleAccept}>
            <AcceptIcon className="accept" />
          </ActionButton>
          <ActionButton onClick={handleCancel}>
            <CancelIcon className="cancel" />
          </ActionButton>
        </>
      )}
    </RequestActions>
  );
};
