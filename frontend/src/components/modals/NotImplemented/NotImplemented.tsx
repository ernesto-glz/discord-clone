import React from 'react';
import { useDispatch } from 'react-redux';
import { actions as ui } from 'src/store/states/ui';
import { ModalBuilder } from '../ModalBuilder';

export const NotImplemented: React.FC = () => {
  const dispatch = useDispatch();

  const onClick = () => dispatch(ui.closedModal('NotImplemented'));

  return (
    <ModalBuilder
      name="NotImplemented"
      background={true}
      header={
        <React.Fragment>
          <div className="title">Sorry!</div>
          <div className="description">
            This feature has not been implemented!
          </div>
        </React.Fragment>
      }
      footer={
        <div className="NotImplementedFooter">
          <button className="button contained-button" onClick={onClick}>
            <div>Okay</div>
          </button>
        </div>
      }
    />
  );
};
