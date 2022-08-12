import React from "react";
import { useNavigate } from "react-router-dom";
import { Image } from "src/components/views/elements/Image";
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
          <Image src='/img/user-raising-hand.svg' />
        )}
        {genericImage === 'NITRO' && (
          <Image src='/img/discord-nitro.svg' />
        )}
        <span>{displayName}</span>
      </div>

      <CloseIcon isVisible={false} />
    </Container>
  );
}
