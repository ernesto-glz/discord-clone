import React from 'react';
import { useDispatch } from 'react-redux';
import Modal from '../modal';
import { Base, Body, Button, Header } from './styles';
import { actions as ui } from 'src/store/states/ui';

export const NotImplemented: React.FC = () => {
  const dispatch = useDispatch();

  const onClick = () => dispatch(ui.closedModal('NotImplemented'));

  return (
    <Modal name="NotImplemented" background={true}>
      <Base>
        <Header>
          <div className="title">Sorry!</div>
          <div className="description">
            This feature has not been implemented!
          </div>
        </Header>
        <Body>
          <Button className="button" onClick={onClick}>
            <div>Okay</div>
          </Button>
        </Body>
      </Base>
    </Modal>
  );
};
