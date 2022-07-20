import { useState } from 'react';
import { useAppSelector } from 'src/redux/hooks';
import { EditButton, ItemWrapper, Value } from './styles';

export const ListItemEmail = () => {
  const [displayState, setDisplayState] = useState<boolean>(false);
  const user = useAppSelector((s) => s.auth.user)!;
  const [email, provider] = user.email.split('@');

  const changeReveal = () => setDisplayState(!displayState);

  return (
    <ItemWrapper style={{ marginTop: '24px' }}>
      <div className="leftSide">
        <h5>EMAIL</h5>
        <Value>
          <span>
            {displayState ? email : '*******'}@{provider}
            <button onClick={changeReveal}>
              {displayState ? 'Hide' : 'Reveal'}
            </button>
          </span>
        </Value>
      </div>
      <EditButton className="button">
        <div>Edit</div>
      </EditButton>
    </ItemWrapper>
  );
};
