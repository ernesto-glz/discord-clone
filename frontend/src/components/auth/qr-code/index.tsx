export const QRCode = () => (
  <div className="qr-container">
    <div className="qr-border">
      <img alt="Qr code" src={`${ASSETS_PATH}/qr_code.png`} loading="lazy" />
    </div>
    <h3 className="qr-title">Log in with QR Code</h3>
    <p className="qr-desc">
      Scan this with the <span>Discord mobile</span> <span>app</span> to log in
      instantly.
    </p>
  </div>
);
