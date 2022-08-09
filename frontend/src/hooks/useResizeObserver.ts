import { useEffect, useMemo } from 'react';

export const useResizeObserver = (fn: () => any, elm: HTMLElement, deps: any) => {
  const observer = useMemo(() => new ResizeObserver(() => fn()), []);

  useEffect(() => {
    if (!elm) return;
    observer.observe(elm);

    return () => {
      observer.disconnect();
    };
  }, [fn, elm, deps]);

  return { observer };
};
