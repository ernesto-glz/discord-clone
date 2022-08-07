import React, { MouseEventHandler, useRef } from 'react';
import ReactDOM from 'react-dom';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { Animations } from 'src/config/constants';
import { actions as ui } from 'src/redux/states/ui';

interface Props {
  name: string;
  background?: boolean;
  animationVariant?: keyof typeof Animations;
  children: React.ReactNode;
}

const Modal: React.FC<Props> = ({
  name,
  background,
  animationVariant,
  children,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const isOpen = !!useAppSelector((s) =>
    s.ui.openModals?.find((n) => n === name)
  );
  const dispatch = useAppDispatch();

  const handleClick: MouseEventHandler<HTMLDivElement> = (ev) => {
    // Click outside modal
    if (modalRef.current && !modalRef.current.contains(ev.target as any)) {
      dispatch(ui.closedModal(name));
    }
  };

  if (background) {
    return isOpen
      ? ReactDOM.createPortal(
          <div onMouseUp={handleClick} className="base-modal bg-modal">
            <motion.div
              ref={modalRef}
              initial="initial"
              animate="visible"
              exit="exit"
              variants={Animations[animationVariant ?? 'SmallToBig']}
            >
              {children}
            </motion.div>
          </div>,
          document.getElementById('root')!
        )
      : null;
  }

  return isOpen
    ? ReactDOM.createPortal(
        <motion.div
          className="base-modal bg-modal-none"
          initial="initial"
          animate="visible"
          exit="exit"
          variants={Animations[animationVariant ?? 'SmallToBig']}
        >
          {children}
        </motion.div>,
        document.getElementById('root')!
      )
    : null;
};

export default Modal;
