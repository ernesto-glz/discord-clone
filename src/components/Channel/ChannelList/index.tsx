import React, { useEffect, useState } from 'react';
import { useRooms } from 'src/hooks/useRooms';
import { useAppSelector } from 'src/redux/hooks';
import { selectUserId } from 'src/redux/states/user';
import ChannelButton from '../ChannelButton';
import { Container, Category, AddCategoryIcon } from './styles';

interface Props {
  channelId: string | undefined;
  initialRooms: string[];
}

const ChannelList: React.FC<Props> = ({ channelId, initialRooms }) => {
  const [selected, setSelected] = useState(channelId || '');
  const { rooms } = useRooms(initialRooms);
  const myId = useAppSelector(selectUserId);

  useEffect(() => {
    setSelected(channelId || '');
  }, [channelId]);

  return (
    <Container>
      <ChannelButton
        channelName="Friends"
        isGeneric={true}
        channelId=""
        selected={selected}
        setSelected={setSelected}
      />

      <Category>
        <span>Direct Messages</span>
        <AddCategoryIcon />
      </Category>

      {rooms?.length > 0 &&
        rooms.map((e: any, i: number) => (
          <ChannelButton
            key={i}
            channelId={e._id}
            selected={selected}
            friendId={myId === e.sender ? e.receiver : e.sender}
            channelName={e.userInfo.username}
            setSelected={setSelected}
            imageUrl={`/assets/avatars/${e.userInfo.avatar || '1'}.png`}
          />
        ))}
    </Container>
  );
};

export default ChannelList;
