import React from 'react';
import { useAppDispatch } from 'src/store/hooks';
import { actions as ui } from 'src/store/states/ui';
import { useNavigate } from 'react-router-dom';
import { ModalBuilder } from '../ModalBuilder';

export const LogoutConfirm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const cancelLogout = () => dispatch(ui.closedModal('LogoutConfirm'));
  const confirmLogout = () => {
    dispatch(ui.closedAllModals());
    navigate('/logout');
  };

  return (
    <ModalBuilder
      name="LogoutConfirm"
      background={true}
      header={
        <div className="LogoutConfirmHeader">
          <div className="title">Log Out</div>
          <div className="description">Are you sure you want to logout?</div>
        </div>
      }
      footer={
        <React.Fragment>
          <button className="transparent-button" onClick={cancelLogout}>
            Cancel
          </button>
          <button
            className="button contained-button"
            data-variant="danger"
            onClick={confirmLogout}
          >
            Log Out
          </button>
        </React.Fragment>
      }
    />
  );
};
