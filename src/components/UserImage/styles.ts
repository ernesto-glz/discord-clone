import styled from 'styled-components';

export const AvatarImage = styled.img`
  display: block;
  object-fit: cover;
  pointer-events: none;
  width: 100%;
  height: 100%;
  grid-area: 1/1;
  border-radius: 100%;
`;

export const GenericSvg = styled.svg`
  margin-right: 10px;
`;

export const UserStatus = styled.rect`
  fill: hsl(38, calc(var(--saturation-factor, 1) * 95.7%), 54.1%);
  width: 25px;
  height: 15px;
  mask: url(#a46440c9-e0ff-4a3d-a98c-20a9bb4eddd5);
`;
