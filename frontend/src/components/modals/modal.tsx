import React from 'react';
import ReactModal from 'react-modal';
import { motion } from 'framer-motion';
import { useAppSelector } from 'src/redux/hooks';

interface Props {
  name: string;
  background?: boolean;
  children: React.ReactNode;
}

const Modal: React.FC<Props> = ({ name, background, children }) => {
  const isOpen = !!useAppSelector((s) =>
    s.ui.openModals?.find((n) => n === name)
  );

  return (
    <ReactModal
      className={background ? 'bg-modal' : 'bg-modal-none'}
      appElement={document.querySelector('#root') as HTMLDivElement}
      isOpen={isOpen}
    >
      <motion.div initial={{ scale: 0.75 }} animate={{ scale: 1 }}>
        {children}
      </motion.div>
    </ReactModal>
  );
};

export default Modal;
