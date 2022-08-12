import React from 'react';

interface Props {
  w?: number;
  h?: number;
  message?: string;
}

export const Spinner: React.FC<Props> = ({ w, h, message }) => {
  return (
    <React.Fragment>
      <div className="Spinner" style={{ width: w ?? 32, height: h ?? 32 }}>
        <div className="Spinner_circle border" />
      </div>
      {message && <div className="Spinner_message">{message}</div>}
    </React.Fragment>
  );
};
