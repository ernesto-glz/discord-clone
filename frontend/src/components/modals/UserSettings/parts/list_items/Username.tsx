import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { actions as ui } from 'src/store/states/ui';

export const ListItemUsername = () => {
  const user = useAppSelector((s) => s.auth.user)!;
  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(ui.openedModal('EditUsername'));
  };

  return (
    <div className="field">
      <div className="leftSide">
        <h5>USERNAME</h5>
        <div className="content">
          <span>{user.username}</span>
          <span className="discriminator">#{user.discriminator}</span>
        </div>
      </div>
      <button
        className="button contained-button"
        data-variant="neutral"
        onClick={onClick}
      >
        <div>Edit</div>
      </button>
    </div>
  );
};
