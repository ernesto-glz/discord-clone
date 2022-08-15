import React from 'react';
import { Close } from '@styled-icons/material';
import { useAppDispatch } from 'src/redux/hooks';
import { actions as ui } from 'src/redux/states/ui';
import Modal from './modal';

interface Props {
  name: string;
  background?: boolean;
  header?: React.ReactNode;
  body?: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'smaller' | 'small' | 'medium' | 'big';
  closeButton?: boolean;
  formHandler?: (e?: React.BaseSyntheticEvent<any> | undefined) => any;
}

const sizes = {
  smaller: 'wSmaller',
  small: 'wSmall',
  medium: 'wMedium',
  big: 'wBig',
};

export const ModalBuilder: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const closeModal = () => dispatch(ui.closedModal(props.name));

  return (
    <Modal name={props.name} background={props.background}>
      <form onSubmit={props.formHandler}>
        <div className={`BaseModal ${sizes[props.size ?? 'small']}`}>
          {props.closeButton && (
            <button
              className="ModalCloseBtn"
              type="button"
              onClick={closeModal}
            >
              <Close className="closeIcon" />
            </button>
          )}
          {props.header && <div className="ModalHeader">{props.header}</div>}
          {props.body && <div className="ModalBody">{props.body}</div>}
          {props.footer && <div className="ModalFooter">{props.footer}</div>}
        </div>
      </form>
    </Modal>
  );
};
