import React from 'react';
import { Entity, RequestTypes } from '@discord/types';
import { useAppDispatch } from 'src/redux/hooks';
import { removeRequest, acceptRequest } from 'src/redux/states/requests';
import {
  AcceptIcon,
  ActionButton,
  CancelIcon,
  RequestActions
} from '../styles';

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
