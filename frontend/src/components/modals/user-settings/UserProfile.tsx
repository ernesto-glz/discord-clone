import React, { useState } from 'react';
import { Button } from 'src/components/views/elements/Button';
import { useAppDispatch } from 'src/redux/hooks';
import { actions as ui } from 'src/redux/states/ui';
import { EditAvatar } from './sub-modals/EditAvatar';
import { UploadAvatar } from './sub-modals/UploadAvatar';

export const UserProfile: React.FC = () => {
  const [file, setFile] = useState<File>();
  const [imageUrl, setImageUrl] = useState<any>(null);
  const dispatch = useAppDispatch();

  const openUploadModal = () => dispatch(ui.openedModal('UploadAvatar'));

  return (
    <div className="UserProfile">
      <div className="tabBar">
        <div className="tabBarItem active" role="tab" tabIndex={0}>User Profile</div>
        <div className="tabBarItem" role="tab" tabIndex={0}>Server Profiles</div>
      </div>
      <div className="customizationSection">
        <h5>Avatar</h5>
        <Button onClick={openUploadModal} className="changeAvatarButton">Change Avatar</Button>
      </div>
      <UploadAvatar
        fileState={[file, setFile]}
        imageState={[imageUrl, setImageUrl]}
      />
      <EditAvatar file={file!} imageUrl={imageUrl} />
    </div>
  );
};
