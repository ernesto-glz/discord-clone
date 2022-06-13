import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'src/redux/hooks';
import { pageSwitched } from 'src/redux/states/ui';

export type PageWrapperProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & { pageTitle?: string };

const PageWrapper: React.FC<PageWrapperProps> = (props) => {
  const { channelId } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(pageSwitched(channelId));
  }, [channelId]);

  return (
    <React.Fragment>
      {props.children}
    </React.Fragment>
  );
};

export default PageWrapper;
