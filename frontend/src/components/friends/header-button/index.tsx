import React from 'react';
import {
  AddFriendBtn,
  MenuButton
} from 'src/components/channel/channel-header/styles';
import { Props } from '../friend-header';

export const HeaderMenuButton = (
  props: Props & { buttonPage: string; displayName: string }
) => {
  const [page, setPage] = props.pageState;
  const isActive = props.buttonPage === page;

  const handleClick = () => {
    return setPage(props.buttonPage);
  };

  return (
    <React.Fragment>
      {props.buttonPage !== 'ADD' ? (
        <MenuButton isActive={isActive} onClick={handleClick}>
          {props.displayName}
        </MenuButton>
      ) : (
        <AddFriendBtn active={isActive} onClick={handleClick}>
          {props.displayName}
        </AddFriendBtn>
      )}
    </React.Fragment>
  );
};
