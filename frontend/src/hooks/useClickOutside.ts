import { useEffect, useRef } from 'react';
import { useAppDispatch } from 'src/redux/hooks';
import { actions as ui } from 'src/redux/states/ui';

export const useClickOutside = () => {
  const ref = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();
  const handleClickOutside = (event: Event) => {
    console.log(event.target);
    if (ref.current && !ref.current.contains(event.target as any))
      dispatch(ui.closedLastModal());
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return { ref };
};
