import React from "react";
import { useNavigate } from "react-router-dom";
import { UserImage } from "src/components/user-image";
import { useAppSelector } from "src/redux/hooks";
import { Container, CloseIcon } from './styles';

type Props = { genericImage: 'FRIEND' | 'NITRO', displayName: string };

export const GenericButton: React.FC<Props> = ({ genericImage, displayName }) => {
  const { activeGuild, activeChannel } = useAppSelector((s) => s.ui);
  const isActive = !activeChannel && displayName !== "Nitro";
  const navigate = useNavigate();

  const onClick = () => {
    if (activeChannel?._id !== "" && displayName !== 'Nitro') {
      navigate(`/channels/${activeGuild}`);
    }
  };
  
  return (
    <Container className={isActive ? 'active' : ''}>
      <div onClick={onClick}>
        <UserImage
          isGeneric={true}
          genericImage={genericImage}
          imageUrl={`${process.env.REACT_APP_API_ROOT}/assets/avatars/${genericImage}.png`}
        />
        <span>{displayName}</span>
      </div>

      <CloseIcon
        isVisible={false}
      />
    </Container>
  );
}