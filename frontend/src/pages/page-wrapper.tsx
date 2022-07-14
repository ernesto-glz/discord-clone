import React, { useEffect } from 'react';
import { WSListeners } from 'src/components/ws-listener';

export type PageWrapperProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & { pageTitle?: string };

const PageWrapper: React.FC<PageWrapperProps> = (props) => {
  useEffect(() => {
    document.title = props.pageTitle ?? 'Discord Clone';
  }, []);

  return (
    <React.Fragment>
      <WSListeners />
      {props.children}
    </React.Fragment>
  );
};

export default PageWrapper;
