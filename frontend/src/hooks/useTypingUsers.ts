import store from 'src/redux/configure-store';
import { useAppSelector } from 'src/redux/hooks';
import { getFriend } from 'src/redux/states/friend';
import { getTypersInChannel } from 'src/redux/states/typing';

const useTypingUsers = () => {
  const selfUser = useAppSelector((s) => s.user)!;
  const channel = useAppSelector((s) => s.ui.activeChannel)!;
  const notSelf = (t: any) => t.userId !== selfUser._id;
  const allUsersTyping = useAppSelector(getTypersInChannel(channel._id)).filter(
    notSelf
  );
  const user = (userId: string) => getFriend(userId)(store.getState());
  const typingUsers = allUsersTyping
    .map((t) => user(t.userId)!.username)
    .join(', ');

  return { typingUsers };
};

export default useTypingUsers;
