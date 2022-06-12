import { useAppSelector } from 'src/redux/hooks';
import { selectDMChannels } from 'src/redux/states/channels';
import { selectActiveChannel } from 'src/redux/states/ui';
import { selectUserId } from 'src/redux/states/user';
import ChannelButton from '../ChannelButton';
import { Container, Category, AddCategoryIcon } from './styles';

const ChannelList: React.FC = () => {
  const channels = useAppSelector(selectDMChannels);
  const activeChannel = useAppSelector(selectActiveChannel);
  const myId = useAppSelector(selectUserId);

  return (
    <Container>
      <ChannelButton
        channelName="Friends"
        isGeneric={true}
        channelId=""
        selected={activeChannel}
      />

      <Category>
        <span>Direct Messages</span>
        <AddCategoryIcon />
      </Category>

      {channels?.length > 0 &&
        channels.map((e: any, i: number) => (
          <ChannelButton
            key={i}
            channelId={e._id}
            selected={activeChannel}
            friendId={myId === e.sender ? e.receiver : e.sender}
            channelName={e.userInfo.username}
            imageUrl={`/assets/avatars/${e.userInfo.avatar || '1'}.png`}
          />
        ))}
    </Container>
  );
};

export default ChannelList;
