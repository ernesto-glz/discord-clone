import { useAppSelector } from 'src/store/hooks';
import { getTypersInChannel } from 'src/store/states/typing';

export const useTypingUsers = () => {
  const users = useAppSelector((s) => s.users);
  const selfUser = useAppSelector((s) => s.auth.user)!;
  const channel = useAppSelector((s) => s.ui.activeChannel)!;
  const notSelf = (t: any) => t.userId !== selfUser.id;
  const allUsersTyping = useAppSelector(getTypersInChannel(channel.id)).filter(notSelf);
  const user = (userId: string) => users.find((u) => u.id === userId);
  const typingUsers = allUsersTyping
    .map((t) => user(t.userId)!.username)
    .join(', ');

  return { typingUsers };
};
