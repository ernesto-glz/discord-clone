import React from 'react';
import { FriendItem } from './friend-list-item';
import { getFriendUsers } from 'src/redux/states/users';
import { useAppSelector } from 'src/redux/hooks';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import {
  Container,
  FlexColumnContainer,
  ListHeader,
  ListBody,
  WampusImage,
  WampusMessage
} from './styles';

interface Props {
  justOnline?: boolean;
}

export const MyFriends: React.FC<Props> = ({ justOnline }) => {
  const friends = useAppSelector(getFriendUsers());
  const onlineFriends = friends.filter((f) => f.status === 'ONLINE');
  const users = justOnline ? onlineFriends : friends;

  if (users.length) {
    return (
      <FlexColumnContainer>
        <ListHeader>
          <h2>
            {justOnline ? 'ONLINE' : 'ALL FRIENDS'} - {users.length}
          </h2>
        </ListHeader>
        <ListBody className='scrollerBase scroller'>
          <AnimatePresence>
            <motion.div layout="size" transition={{ duration: 0.1 }}>
              {users.map((user) => <FriendItem key={user.id} friend={user} /> )}
            </motion.div>
          </AnimatePresence>
        </ListBody>
      </FlexColumnContainer>
    );
  }

  return (
    <React.Fragment>
      {justOnline ? (
        <Container>
          <WampusImage src='/assets/wampus/wampus_sleeping.svg' alt="No Online" />
          <WampusMessage>
            No one&apos;s around to play with Wumpus.
          </WampusMessage>
        </Container>
      ) : (
        <Container>
          <WampusImage src='/assets/wampus/wampus_king.svg' alt="No Friends" />
          <WampusMessage>No friends, only Wampus.</WampusMessage>
        </Container>
      )}
    </React.Fragment>
  );
};
