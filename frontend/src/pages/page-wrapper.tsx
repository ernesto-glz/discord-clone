import React, { useEffect } from 'react';
import { UserSettings } from 'src/components/modals/UserSettings/UserSettings';
import { WSListeners } from 'src/components/ws-listener';
import { NotImplemented } from 'src/components/modals/NotImplemented/NotImplemented';
import { LogoutConfirm } from 'src/components/modals/LogoutConfirm/logout-confirm';
import { motion } from 'framer-motion';

export type PageWrapperProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & { pageTitle?: string };

const PageWrapper: React.FC<PageWrapperProps> = (props) => {
  useEffect(() => {
    document.title = props.pageTitle ?? 'Discord Clone';
  }, [props.pageTitle]);

  return (
    <motion.div>
      <WSListeners />
      <UserSettings />
      <NotImplemented />
      <LogoutConfirm />
      {props.children}
    </motion.div>
  );
};

export default PageWrapper;
