import React from 'react';
import { Entity, RequestTypes } from '@discord/types';
import { useAppDispatch } from 'src/store/hooks';
import { removeRequest, acceptRequest } from 'src/store/states/requests';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faClose } from '@fortawesome/free-solid-svg-icons';

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
          <FontAwesomeIcon icon={faCheck} className="accept action-icon" />
        </div>
      )}
      <div className="action-button" onClick={handleCancel}>
        <FontAwesomeIcon icon={faClose} className="cancel action-icon" />
      </div>
    </div>
  );
};
