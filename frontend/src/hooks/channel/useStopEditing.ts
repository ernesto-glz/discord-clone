import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { actions as ui } from 'src/store/states/ui';

export const useStopEditing = () => {
  const dispatch = useAppDispatch();
  const editingMessageId = useAppSelector((s) => s.ui.editingMessageId);

  const handleEscape = (ev: KeyboardEvent) => {
    if (ev.key !== 'Escape') return;
    if (editingMessageId) dispatch(ui.stoppedEditingMessage());
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    }
  }, [editingMessageId]);

  return {};
};
