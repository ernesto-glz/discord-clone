import { faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ChangeEvent } from 'react';
import { useAppDispatch } from 'src/store/hooks';
import { actions as ui } from 'src/store/states/ui';
import { readFile } from 'src/utils/utils';
import { ModalBuilder } from '../ModalBuilder';

interface Props {
  imageState: [any, any];
  fileState: [any, any];
}

export const UploadAvatar: React.FC<Props> = (props) => {
  const [, setImageUrl] = props.imageState;
  const [, setFile] = props.fileState;
  const dispatch = useAppDispatch();

  const onInput = async (ev: ChangeEvent<HTMLInputElement>) => {
    const file = ev.target?.files?.[0];
    if (!file) return dispatch(ui.closedModal('EditAvatar'));
    const url = await readFile(file);
    setFile(file);
    setImageUrl(url);
    ev.target.value = '';
    dispatch(ui.openedModal('EditAvatar'));
    dispatch(ui.closedModal('UploadAvatar'));
  };

  return (
    <div className="UploadAvatarModal">
      <ModalBuilder
        name="UploadAvatar"
        background={true}
        closeButton={true}
        size="smaller"
        header={<div className="title uploadAvatarHeader">Upload Image</div>}
        body={
          <div className="uploadBox">
            <div className="uploadBoxImage">
              <FontAwesomeIcon icon={faImage} color="#fff" />
            </div>
            <div className="uploadBoxText">Upload Image</div>
            <input className="uploadAvatar" type="file" onChange={onInput} />
          </div>
        }
      />
    </div>
  );
};
