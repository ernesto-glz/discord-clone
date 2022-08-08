import React from 'react';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { actions as ui } from 'src/redux/states/ui';

interface Props {
  section: string;
  name: string;
}

export const HeaderButton: React.FC<Props> = (props) => {
  const section = useAppSelector((s) => s.ui.friendsSection);
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
    </button>
  );
};
