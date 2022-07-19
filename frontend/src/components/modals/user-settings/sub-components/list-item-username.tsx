import { useAppSelector } from "src/redux/hooks";
import { EditButton, ItemWrapper, Value } from "./styles";

export const ListItemUsername = () => {
  const user = useAppSelector((s) => s.auth.user)!;
  
  return (
    <ItemWrapper>
      <div className="leftSide">
        <h5>USERNAME</h5>
        <Value>
          <span>{user.username}</span>
          <span className="discrim">#{user.discriminator}</span>
        </Value>
      </div>
      <EditButton className="button">
        <div>Edit</div>
      </EditButton>
    </ItemWrapper>
  );
};
