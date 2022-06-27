import { useAppSelector } from 'src/redux/hooks';
import { selectDMChannels } from 'src/redux/states/channels';
import { selectActiveChannel } from 'src/redux/states/ui';
import ChannelButton from '../channel-button';
import { Container, Category, AddCategoryIcon } from './styles';

const ChannelList: React.FC = () => {
  const channels = useAppSelector(selectDMChannels);
  const activeChannel = useAppSelector(selectActiveChannel);
  const hiddenChannels = useAppSelector((s) => s.user.hiddenDMChannels);

  return (
    <Container>
      <ChannelButton
        channelName="Friends"
        isGeneric={true}
        channelId=""
        genericImage="FRIEND"
        selected={activeChannel}
      />

      <ChannelButton
        channelName="Nitro"
        isGeneric={true}
        channelId="not"
        genericImage="NITRO"
        selected={activeChannel}
      />

      <Category>
        <span>Direct Messages</span>
        <AddCategoryIcon />
      </Category>

      {channels.length > 0 &&
        channels.map((c, i: number) => {
          if (!hiddenChannels!.includes(c._id)) {
            return (
              <ChannelButton
                key={i}
                channelId={c._id}
                selected={activeChannel}
                friendId={c.dmUser!._id}
                channelName={c.name}
                imageUrl={`${process.env.REACT_APP_API_ROOT}/assets/avatars/${
                  c.dmUser!.avatar
                }.png`}
              />
            );
          }
        })}
    </Container>
  );
};

export default ChannelList;
