import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FormEvent } from 'react';
import { useAppDispatch } from 'src/store/hooks';
import { actions as ui } from 'src/store/states/ui';
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
  const fakeOnSubmit = (ev: FormEvent) => ev.preventDefault();

  return (
    <Modal name={props.name} background={props.background}>
      <form onSubmit={props.formHandler ?? fakeOnSubmit}>
        <div className={`BaseModal ${sizes[props.size ?? 'small']}`}>
          {props.closeButton && (
            <button
              className="ModalCloseBtn"
              type="button"
              onClick={closeModal}
            >
              <FontAwesomeIcon icon={faClose} className="closeIcon" />
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
