import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { EditButton, ItemWrapper, Value } from './styles';
import { actions as ui } from 'src/store/states/ui';

export const ListItemUsername = () => {
  const user = useAppSelector((s) => s.auth.user)!;
  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(ui.openedModal('EditUsername'));
  };

  return (
    <ItemWrapper>
      <div className="leftSide">
        <h5>USERNAME</h5>
        <Value>
          <span>{user.username}</span>
          <span className="discrim">#{user.discriminator}</span>
        </Value>
      </div>
      <EditButton className="button" onClick={onClick}>
        <div>Edit</div>
      </EditButton>
    </ItemWrapper>
  );
};
