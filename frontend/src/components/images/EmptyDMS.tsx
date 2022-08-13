import React from 'react';

interface Props extends React.ComponentProps<'svg'> {}

export const EmptyDMS: React.FC<Props> = (props) => {
  return (
    <svg
      width="184"
      height="428"
      viewBox="0 0 184 428"
      className="emptyChannels"
    >
      <rect x="40" y="6" width="144" height="20" rx="10"></rect>
      <circle cx="16" cy="16" r="16"></circle>
      <rect x="40" y="50" width="144" height="20" rx="10" opacity="0.9"></rect>
      <circle cx="16" cy="60" r="16" opacity="0.9"></circle>
      <rect x="40" y="94" width="144" height="20" rx="10" opacity="0.8"></rect>
      <circle cx="16" cy="104" r="16" opacity="0.8"></circle>
      <rect x="40" y="138" width="144" height="20" rx="10" opacity="0.7"></rect>
      <circle cx="16" cy="148" r="16" opacity="0.7"></circle>
      <rect x="40" y="182" width="144" height="20" rx="10" opacity="0.6"></rect>
      <circle cx="16" cy="192" r="16" opacity="0.6"></circle>
      <rect x="40" y="226" width="144" height="20" rx="10" opacity="0.5"></rect>
      <circle cx="16" cy="236" r="16" opacity="0.5"></circle>
      <rect x="40" y="270" width="144" height="20" rx="10" opacity="0.4"></rect>
      <circle cx="16" cy="280" r="16" opacity="0.4"></circle>
      <rect x="40" y="314" width="144" height="20" rx="10" opacity="0.3"></rect>
      <circle cx="16" cy="324" r="16" opacity="0.3"></circle>
      <rect x="40" y="358" width="144" height="20" rx="10" opacity="0.2"></rect>
      <circle cx="16" cy="368" r="16" opacity="0.2"></circle>
      <rect x="40" y="402" width="144" height="20" rx="10" opacity="0.1"></rect>
      <circle cx="16" cy="412" r="16" opacity="0.1"></circle>
    </svg>
  );
};
