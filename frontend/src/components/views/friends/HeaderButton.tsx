import React from 'react';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { getIncomingRequests } from 'src/redux/states/requests';
import { actions as ui } from 'src/redux/states/ui';

interface Props {
  section: string;
  name: string;
}

export const HeaderButton: React.FC<Props> = (props) => {
  const section = useAppSelector((s) => s.ui.friendsSection);
  const requests = useAppSelector(getIncomingRequests());
  const isActive = props.section === section;
  const isAddButton = props.section === 'ADD';
  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(ui.sectionSwitched(props.section));
  };

  return (
    <button
      className={isAddButton ? 'add-friend-button' : 'header-button'}
      data-active={isActive}
      onClick={onClick}
    >
      {props.name}
      {props.section === 'PENDING' && requests.length > 0 && (
        <div className="notificationBadge" style={{ marginTop: 1 }}>
          {requests.length}
        </div>
      )}
    </button>
  );
};
