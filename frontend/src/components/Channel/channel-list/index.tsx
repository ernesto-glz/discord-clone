import { useAppSelector } from 'src/redux/hooks';
import { getDMChannels } from 'src/redux/states/channels';
import { getActiveChannel } from 'src/redux/states/ui';
import ChannelButton from '../channel-button';
import { Container, Category, AddCategoryIcon } from './styles';

const ChannelList: React.FC = () => {
  const channels = useAppSelector(getDMChannels);
  const activeChannel = useAppSelector(getActiveChannel);
  const hiddenChannels = useAppSelector((s) => s.user.hiddenDMChannels);

  return (
    <Container>
      <ChannelButton
        channelName="Friends"
        isGeneric={true}
        channelId=""
        genericImage="FRIEND"
        selected={activeChannel?._id ?? ''}
      />

      <ChannelButton
        channelName="Nitro"
        isGeneric={true}
        channelId="not"
        genericImage="NITRO"
        selected={activeChannel?._id ?? ''}
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
                selected={activeChannel?._id ?? ''}
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
