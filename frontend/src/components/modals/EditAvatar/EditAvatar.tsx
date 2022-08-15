import React, { useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';
import { useAppDispatch } from 'src/redux/hooks';
import { actions as ui } from 'src/redux/states/ui';
import { uploadUserAvatar } from 'src/redux/states/users';
import { getCroppedImg, PixelCrop } from 'src/utils/canvas';
import { ModalBuilder } from '../ModalBuilder';

interface Props {
  imageUrl: string;
  file: File;
}

export const EditAvatar: React.FC<Props> = ({ imageUrl, file }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<PixelCrop>({
    x: 0,
    y: 0,
    height: 0,
    width: 0,
  });
  const dispatch = useAppDispatch();

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const changeZoom = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setZoom(+ev.target.value);
  };

  const closeModal = (alsoUploader = false) => {
    dispatch(ui.closedModal('EditAvatar'));
    alsoUploader
      ? dispatch(ui.closedModal('UploadAvatar'))
      : dispatch(ui.openedModal('UploadAvatar'));
  };

  const changeAvatarNormal = useCallback(async () => {
    dispatch(uploadUserAvatar(file));
    closeModal(true);
  }, [imageUrl]);

  const changeAvatarCropped = useCallback(async () => {
    const { type, name } = file;
    const croppedImg = await getCroppedImg(imageUrl, croppedAreaPixels);

    if (!croppedImg) return;

    const croppedFile = new File([croppedImg], name, { type });
    dispatch(uploadUserAvatar(croppedFile));
    closeModal(true);
  }, [imageUrl, croppedAreaPixels]);

  return imageUrl ? (
    <ModalBuilder
      name="EditAvatar"
      background={true}
      size="medium"
      header={
        <div className="EditAvatarHeader">
          <div className="title">Edit Image</div>
        </div>
      }
      body={
        <React.Fragment>
          <Cropper
            classes={{
              containerClassName: 'CropperContainer',
              mediaClassName: 'CropperMedia',
              cropAreaClassName: 'CropperCropArea',
            }}
            image={imageUrl}
            showGrid={false}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            objectFit="contain"
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            zoomWithScroll={false}
            minZoom={1}
          />

          <input
            className="image-slider"
            type="range"
            min={1}
            max={3}
            step={0.1}
            defaultValue={zoom}
            role="slider"
            onChange={changeZoom}
          />
        </React.Fragment>
      }
      footer={
        <div className="EditAvatarFooter space-between">
          <button
            onClick={changeAvatarNormal}
            type="button"
            className="transparent-button button"
          >
            Skip
          </button>
          <div className="right-side">
            <button
              onClick={() => closeModal()}
              type="button"
              className="transparent-button button"
            >
              Cancel
            </button>
            <button
              onClick={changeAvatarCropped}
              type="submit"
              className="contained-button button"
            >
              Apply
            </button>
          </div>
        </div>
      }
    />
  ) : null;
};
