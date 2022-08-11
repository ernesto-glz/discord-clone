import React, { useEffect, useMemo } from 'react';
import { useScrollbarState } from './useScrollbarState';

interface Props {
  scrollbarRef?: React.RefObject<HTMLDivElement>;
}

export const useResizeObserver = ({ scrollbarRef }: Props) => {
  const { stuckAtBottom } = useScrollbarState();
  const observer = useMemo(() => new ResizeObserver(() => {
    if (!scrollbarRef) return;

    const scrollbar = scrollbarRef.current!;
    if (!stuckAtBottom) return;

    scrollbar.scroll({ top: scrollbar.scrollHeight });
  }), []);

  useEffect(() => {
    if (!scrollbarRef?.current) return;
    observer.observe(scrollbarRef.current);

    return () => {
      observer.disconnect();
    };
  }, [stuckAtBottom]);

  return { observer };
};
