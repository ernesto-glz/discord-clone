import React from 'react';
import { UserImage } from 'src/components/UserImage';
import { Profile, UserData } from 'src/components/UserInfo/styles';
import { useAppSelector } from 'src/redux/hooks';
import { selectUsername } from 'src/redux/states/user';
import { FriendRequest } from '../styles';
import { FriendItemActions } from './friend-actions';

interface Props {
  data: any;
}

export const FriendItem: React.FC<Props> = ({ data }) => {
  const myUsername = useAppSelector(selectUsername);
  const userInfo = myUsername === data.to.username ? data.from : data.to;

  return (
    <FriendRequest>
      <div>
        <Profile>
          <UserImage
            isGeneric={false}
            displayStatus={false}
            imageUrl={`/assets/avatars/${userInfo.avatar}.png`}
          />
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
