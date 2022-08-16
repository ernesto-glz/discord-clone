import React from 'react';

type Props = { styles?: React.CSSProperties };

export const OfflineStatus: React.FC<Props> = (props) => {
  return (
    <svg width="10" height="15" viewBox="0 0 10 15" style={props.styles}>
      <mask id="dba57ff2-ac25-4564-93b5-df3a28f798f8">
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
          x="2.5"
          y="5"
          width="5"
          height="5"
          rx="2.5"
          ry="2.5"
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
        fill="hsl(214, calc(1 * 9.9%), 50.4%)"
        mask="url(#dba57ff2-ac25-4564-93b5-df3a28f798f8)"
      ></rect>
    </svg>
  );
};
