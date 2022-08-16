import { actions as ui } from 'src/store/states/ui';
import { useAppDispatch } from 'src/store/hooks';

export const ListItemPhone = () => {
  const dispatch = useAppDispatch();

  const onClick = () => dispatch(ui.openedModal('NotImplemented'));

  return (
    <div className="field" style={{ marginTop: '24px' }}>
      <div className="leftSide">
        <h5>PHONE NUMBER</h5>
        <div className="content">You haven't added a phone number yet.</div>
      </div>
      <button
        className="button contained-button"
        data-variant="neutral"
        onClick={onClick}
      >
        <div>Add</div>
      </button>
    </div>
  );
};
