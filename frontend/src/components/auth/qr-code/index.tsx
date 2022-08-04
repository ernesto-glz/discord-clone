import { QRBorder, QRContainer, QRDescription, QRTitle } from './styles';

export const QRCode = () => (
  <QRContainer>
    <QRBorder>
      <img alt="Qr code" src={`${ASSETS_PATH}/qr_code.png`} loading="lazy" />
    </QRBorder>
    <QRTitle>Log in with QR Code</QRTitle>
    <QRDescription>
      Scan this with the <span>Discord mobile</span> <span>app</span> to log in
      instantly.
    </QRDescription>
  </QRContainer>
);
