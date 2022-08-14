import React, { ChangeEvent } from 'react';
import { useAppDispatch } from 'src/redux/hooks';
import { uploadUserAvatar } from 'src/redux/states/users';

interface Props {}

export const UserProfile: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();

  const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const file = ev.currentTarget?.files?.[0];
    if (file) dispatch(uploadUserAvatar(file));
  };

  return <input type="file" onChange={onChange} />;
};
