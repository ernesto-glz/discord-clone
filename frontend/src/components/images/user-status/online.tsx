import React from 'react';

type Props = { styles?: React.CSSProperties };

export const OnlineStatus: React.FC<Props> = (props) => {
  return (
    <svg width="10" height="15" viewBox="0 0 10 15" style={props.styles}>
      <mask id="c4741371-83dd-4c56-a80a-1e53e1153bc4">
        <rect
          x="0"
          y="2.5"
          width="10"
          height="10"
          rx="5"
          ry="5"
          fill="white"
        ></rect>
        <rect
          x="5"
          y="7.5"
          width="0"
          height="0"
          rx="0"
          ry="0"
          fill="black"
        ></rect>
        <polygon
          points="-2.16506,-2.5 2.16506,0 -2.16506,2.5"
          fill="black"
          transform="scale(0) translate(5.625 7.5)"
          style={{ transformOrigin: '5.625px 7.5px' }}
        ></polygon>
        <circle fill="black" cx="5" cy="7.5" r="0"></circle>
      </mask>
      <rect
        x="0"
        y="0"
        width="10"
        height="15"
        fill="hsl(139, calc(var(--saturation-factor, 1) * 47.3%), 43.9%)"
        mask="url(#c4741371-83dd-4c56-a80a-1e53e1153bc4)"
      ></rect>
    </svg>
  );
};
