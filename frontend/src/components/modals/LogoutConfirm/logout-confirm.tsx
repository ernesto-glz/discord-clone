import React from 'react';
import { useAppDispatch } from 'src/store/hooks';
import Modal from '../modal';
import { Base, Body, CancelButton, Header, LogoutButton } from './styles';
import { actions as ui } from 'src/store/states/ui';
import { useNavigate } from 'react-router-dom';

export const LogoutConfirm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const cancelLogout = () => dispatch(ui.closedModal('LogoutConfirm'));
  const confirmLogout = () => {
    dispatch(ui.closedAllModals());
    navigate('/logout');
  };

  return (
    <Modal background={true} name="LogoutConfirm">
      <Base>
        <Header>
          <div className="title">Log Out</div>
          <div className="description">Are you sure you want to logout?</div>
        </Header>
        <Body>
          <CancelButton onClick={cancelLogout}>Cancel</CancelButton>
          <LogoutButton className="button" onClick={confirmLogout}>
            Log Out
          </LogoutButton>
        </Body>
      </Base>
    </Modal>
  );
};
