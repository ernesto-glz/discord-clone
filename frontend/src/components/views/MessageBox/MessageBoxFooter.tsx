import React from 'react';
import { PulseLoader } from 'react-spinners';
import { useTypingUsers } from 'src/hooks/useTypingUsers';
import { useAppDispatch } from 'src/redux/hooks';
import { actions as ui } from 'src/redux/states/ui';

interface Props {
  editMode?: boolean;
  saveMessage: () => void;
}

export const MessageBoxFooter: React.FC<Props> = (props) => {
  const { editMode, saveMessage } = props;
  const { typingUsers } = useTypingUsers();
  const dispatch = useAppDispatch();

  const stopEditing = () => dispatch(ui.stoppedEditingMessage());

  return editMode ? (
    <div className="editing-info">
      escape to{' '}
      <a onClick={stopEditing} role="button">
        cancel
      </a>{' '}
      • enter to{' '}
      <a onClick={saveMessage} role="button">
        save
      </a>
    </div>
  ) : (
    <div className="typing-users">
      {typingUsers && (
        <React.Fragment>
          <PulseLoader color="white" size={5} speedMultiplier={0.8} />{' '}
          <strong>{typingUsers}</strong> is typing...
        </React.Fragment>
      )}
    </div>
  );
};
