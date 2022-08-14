import React, { ChangeEvent } from 'react';
import { useAppDispatch } from 'src/redux/hooks';
import { actions as ui } from 'src/redux/states/ui';
import { Body, CloseButton, CloseIcon, EditModalBase, Header } from './styles';
import { ImageAdd } from '@styled-icons/boxicons-solid';
import { readFile } from 'src/utils/utils';
import Modal from '../../modal';

interface Props {
  imageState: [any, any];
  fileState: [any, any];
}

export const UploadAvatar: React.FC<Props> = (props) => {
  const [, setImageUrl] = props.imageState;
  const [, setFile] = props.fileState;
  const dispatch = useAppDispatch();

  const closeModal = () => dispatch(ui.closedModal('UploadAvatar'));

  const onInput = async (ev: ChangeEvent<HTMLInputElement>) => {
    const file = ev.target?.files?.[0];
    if (!file) return dispatch(ui.closedModal('EditAvatar'));
    const url = await readFile(file);
    setFile(file);
    setImageUrl(url);
    dispatch(ui.openedModal('EditAvatar'));
    ev.target.value = '';
  };

  return (
    <Modal name="UploadAvatar" background={true}>
      <EditModalBase className="UploadAvatarModal">
        <Header className="header">
          <div className="title">Edit Image</div>
          <CloseButton type="button" onClick={closeModal}>
            <CloseIcon className="closeIcon" />
          </CloseButton>
        </Header>
        <Body>
          <div className="uploadBox">
            <div className="uploadBoxImage">
              <ImageAdd width={24} height={24} color="#fff" />
            </div>
            <div className="uploadBoxText">Upload Image</div>
            <input className="uploadAvatar" type="file" onChange={onInput} />
          </div>
        </Body>
      </EditModalBase>
    </Modal>
  );
};
