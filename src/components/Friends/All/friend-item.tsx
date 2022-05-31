import React from 'react';
import { useSelector } from 'react-redux';
import { Avatar, Profile, UserData } from 'src/components/UserInfo/styles';
import { UserState } from 'src/models/user.model';
import { FriendRequest } from '../styles';
import { FriendItemActions } from './friend-actions';

interface Props {
  data: any;
}

export const FriendItem: React.FC<Props> = ({ data }) => {
  const myUsername = useSelector((state: UserState) => state.user.username);
  const userInfo = myUsername === data.to.username ? data.from : data.to;

  return (
    <FriendRequest>
      <div>
        <Profile>
          <Avatar />
          <UserData>
            <strong>{userInfo.username}</strong>
            <span>#{userInfo.shortId}</span>
          </UserData>
        </Profile>
      </div>
      <FriendItemActions userId={userInfo._id} />
    </FriendRequest>
  );
};
