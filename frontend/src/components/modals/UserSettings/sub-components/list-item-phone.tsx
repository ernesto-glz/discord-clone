import { EditButton, ItemWrapper, Value } from './styles';
import { actions as ui } from 'src/store/states/ui';
import { useAppDispatch } from 'src/store/hooks';

export const ListItemPhone = () => {
  const dispatch = useAppDispatch();

  const onClick = () => dispatch(ui.openedModal('NotImplemented'));

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
