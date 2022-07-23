import React from 'react';
import ReactModal from 'react-modal';
import { motion } from 'framer-motion';
import { useAppSelector } from 'src/redux/hooks';
import { Animations } from 'src/config/constants';

interface Props {
  animated?: boolean;
  name: string;
  background?: boolean;
  animationVariant?: keyof typeof Animations;
  children: React.ReactNode;
}

const Modal: React.FC<Props> = ({
  animated,
  name,
  background,
  animationVariant,
  children
}) => {
  const isOpen = !!useAppSelector((s) => s.ui.openModals?.find((n) => n === name));

  return (
    <ReactModal
      className={background ? 'bg-modal' : 'bg-modal-none'}
      appElement={document.querySelector('#root') as HTMLDivElement}
      isOpen={isOpen}
    >
      {animated ? (
        <motion.div
          initial="medium"
          animate="visible"
          exit="hidden"
          variants={Animations[animationVariant ?? 'SmallToBig']}
        >
          {children}
        </motion.div>
      ) : (
        <React.Fragment>{children}</React.Fragment>
      )}
    </ReactModal>
  );
};

export default Modal;
