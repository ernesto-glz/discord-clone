import React, { useEffect } from 'react';
import { UserSettings } from 'src/components/modals/user-settings/user-settings';
import { WSListeners } from 'src/components/ws-listener';
import { motion } from 'framer-motion';
import { EditUsername } from 'src/components/modals/user-settings/sub-modals/edit-username';
import { NotImplemented } from 'src/components/modals/not-implemented/not-implemented';
import { LogoutConfirm } from 'src/components/modals/logout-confirm/logout-confirm';

export type PageWrapperProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & { pageTitle?: string };

const PageWrapper: React.FC<PageWrapperProps> = (props) => {
  useEffect(() => {
    document.title = props.pageTitle ?? 'Discord Clone';
  }, []);

  return (
    <motion.div>
      <WSListeners />
      <UserSettings />
      <EditUsername />
      <LogoutConfirm />
      <NotImplemented />
      {props.children}
    </motion.div>
  );
};

export default PageWrapper;
