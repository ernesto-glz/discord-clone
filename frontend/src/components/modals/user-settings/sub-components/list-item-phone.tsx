import { useAppSelector } from 'src/redux/hooks';
import { EditButton, ItemWrapper, Value } from './styles';

export const ListItemPhone = () => {
  const user = useAppSelector((s) => s.auth.user)!;

  return (
    <ItemWrapper style={{ marginTop: '24px' }}>
      <div className="leftSide">
        <h5>PHONE NUMBER</h5>
        <Value>
          You haven't added a phone number yet.
        </Value>
      </div>
      <EditButton className="button">
        <div>Add</div>
      </EditButton>
    </ItemWrapper>
  );
};
