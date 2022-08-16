import { useState } from 'react';
import { useAppSelector } from 'src/store/hooks';

export const ListItemEmail = () => {
  const [displayState, setDisplayState] = useState<boolean>(false);
  const user = useAppSelector((s) => s.auth.user)!;
  const [email, provider] = user.email.split('@');

  const changeReveal = () => setDisplayState(!displayState);

  return (
    <div className="field" style={{ marginTop: '24px' }}>
      <div className="leftSide">
        <h5>EMAIL</h5>
        <div className="content">
          <span>
            {displayState ? email : '*******'}@{provider}
            <button onClick={changeReveal}>
              {displayState ? 'Hide' : 'Reveal'}
            </button>
          </span>
        </div>
      </div>
      <button className="button contained-button" data-variant="neutral">
        <div>Edit</div>
      </button>
    </div>
  );
};
