import { useSelector } from 'react-redux';
import { getTypersInChannel } from 'src/redux/states/typing';
import { Store } from 'types/store';

const useTypingUsers = () => {
  const users = useSelector((s: Store.AppState) => s.users);
  const selfUser = useSelector((s: Store.AppState) => s.auth.user)!;
  const channel = useSelector((s: Store.AppState) => s.ui.activeChannel)!;
  const notSelf = (t: any) => t.userId !== selfUser._id;
  const allUsersTyping = useSelector(getTypersInChannel(channel._id)).filter(
    notSelf
  );
  const user = (userId: string) => users.find((u) => u._id === userId);
  const typingUsers = allUsersTyping
    .map((t) => user(t.userId)!.username)
    .join(', ');

  return { typingUsers };
};

export default useTypingUsers;
