import React from 'react';
import { useAppDispatch } from 'src/store/hooks';
import Modal from '../modal';
import { Base, Body, CancelButton, Header, LogoutButton } from './styles';
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
        <div className='LogoutConfirmHeader'>
          <div className="title">Log Out</div>
          <div className="description">Are you sure you want to logout?</div>
        </div>
      }
      footer={
        <React.Fragment>
          <CancelButton onClick={cancelLogout}>Cancel</CancelButton>
          <LogoutButton className="button" onClick={confirmLogout}>
            Log Out
          </LogoutButton>
        </React.Fragment>
      }
    />
  );
};
