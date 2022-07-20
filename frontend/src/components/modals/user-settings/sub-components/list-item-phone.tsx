import { EditButton, ItemWrapper, Value } from './styles';
import { actions as ui } from 'src/redux/states/ui';
import { useAppDispatch } from 'src/redux/hooks';

export const ListItemPhone = () => {
  const dispatch = useAppDispatch();

  const onClick = () => dispatch(ui.openedModal('notImplemented'));

  return (
    <ItemWrapper style={{ marginTop: '24px' }}>
      <div className="leftSide">
        <h5>PHONE NUMBER</h5>
        <Value>You haven't added a phone number yet.</Value>
      </div>
      <EditButton className="button" onClick={onClick}>
        <div>Add</div>
      </EditButton>
    </ItemWrapper>
  );
};
