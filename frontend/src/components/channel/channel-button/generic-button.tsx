import React from "react";
import { useNavigate } from "react-router-dom";
import { NitroImage } from "src/components/images/tiny-icons/nitro-image";
import { UserRaisingHand } from "src/components/images/tiny-icons/user-raising-hand";
import { useAppSelector } from "src/redux/hooks";
import { Container, CloseIcon } from './styles';

type Props = { genericImage: 'FRIEND' | 'NITRO', displayName: string };

export const GenericButton: React.FC<Props> = ({ genericImage, displayName }) => {
  const { activeGuild, activeChannel } = useAppSelector((s) => s.ui);
  const isActive = !activeChannel && displayName !== "Nitro";
  const navigate = useNavigate();

  const onClick = () => {
    if (activeChannel?.id !== '' && displayName !== 'Nitro') {
      navigate(`/channels/${activeGuild}`);
    }
  };
  
  return (
    <Container className={isActive ? 'active' : ''}>
      <div onClick={onClick}>
        {genericImage === 'FRIEND' && (
          <UserRaisingHand width="24" height="32" fill="currentColor" />
        )}
        {genericImage === 'NITRO' && (
          <NitroImage width="24" height="32" fill="currentColor" />
        )}
        <span>{displayName}</span>
      </div>

      <CloseIcon isVisible={false} />
    </Container>
  );
}