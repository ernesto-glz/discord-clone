import React from 'react';
import ReactModal from 'react-modal';
import { motion } from 'framer-motion';
import { useAppSelector } from 'src/redux/hooks';

interface Props {
  name: string;
  size?: 'full' | 'sm' | 'md';
  children: React.ReactNode;
}

const sizes = {
  'sm': 'sm',
  'md': 'md',
  'full': 'full'
}

const Modal: React.FC<Props> = ({ name, size, children }) => {
  const openModal = useAppSelector((s) => s.ui.openModal);

  return (
    <ReactModal
      className={sizes[size ?? 'sm']}
      appElement={document.querySelector('#root') as HTMLDivElement}
      isOpen={openModal === name}
    >
      <motion.div
        initial={{ opacity: 0.75, scale: 0.75 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        {children}
      </motion.div>
    </ReactModal>
  );
};

export default Modal;
