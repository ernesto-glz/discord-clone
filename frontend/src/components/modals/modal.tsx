import React, { MouseEvent, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { Animations } from 'src/config/constants';
import { actions as ui } from 'src/store/states/ui';

interface Props {
  name: string;
  background?: boolean;
  animationVariant?: keyof typeof Animations;
  children: React.ReactNode;
}

const Modal: React.FC<Props> = (props) => {
  const { name, background, animationVariant, children } = props;
  const [clickedArea, setClickedArea] = useState<EventTarget>();
  const modalRef = useRef<HTMLDivElement>(null);
  const openModals = useAppSelector((s) => s.ui.openModals);
  const isOpen = !!openModals?.find((modal) => modal === name);
  const dispatch = useAppDispatch();

  const onMouseDown = (ev: MouseEvent<HTMLDivElement>) => {
    setClickedArea(ev.target);
  };

  // Handle click outside modal content area.
  const onMouseUp = (ev: MouseEvent) => {
    const isSameArea = ev.target === clickedArea;
    if (!modalRef.current) return;

    if (!modalRef.current.contains(ev.target as any) && isSameArea)
      dispatch(ui.closedModal(name));
  };

  if (background) {
    const modal = (
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            className="Modal SemiTransparentModalBg"
            initial="initial"
            animate="visible"
            exit="exit"
            variants={Animations['BgOpacity']}
          >
            <motion.div
              ref={modalRef}
              initial="initial"
              animate="visible"
              exit="exit"
              variants={Animations[animationVariant ?? 'SmallToBig']}
            >
              {React.Children.map(children, (child: any, i) =>
                React.cloneElement(child, { key: `DiscordModal-${i}` })
              )}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    );
    return ReactDOM.createPortal(modal, document.body);
  }

  const modal = (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="Modal TransparentModalBg"
          initial="initial"
          animate="visible"
          exit="exit"
          variants={Animations['BigToSmall']}
        >
          {React.Children.map(children, (child: any, i) =>
            React.cloneElement(child, { key: `DiscordModal-${i}` })
          )}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  return ReactDOM.createPortal(modal, document.body);
};

export default Modal;
