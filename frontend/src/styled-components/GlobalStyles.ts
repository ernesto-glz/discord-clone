import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
    --tertiary: rgb(32,34,37);
    --quinary: #393d42;
    --senary: #828386;
    
    --white: #fff;
    --gray: #8a8c90;
    --green: #3ba55d;
    --chat-input: rgb(64,68,75);
    --symbol: #74777a;
    --notification: #f84a4b;
    --discord: #6e86d6;
    --link: #5d80d6;

    --background-primary: #36393f;
    --background-secondary: #2f3136;
    --background-tertiary: #202225;
    --background-inactive: #72767c;
    --background-modifier-accent: rgba(79,84,92,0.48);
    --background-modifier-selected: rgba(79,84,92,0.6);
    --background-modifier-hover: rgba(79,84,92,0.4);
    --background-message-hover: rgba(4,4,5,0.07);
    --background-floating: #18191c;
    --button-secondary-background: #4f545c;

    --header-primary: #fff;
    --header-secondary: #b9bbbe;

    --text-normal: #DCDDDE;
    --text-muted: #a3a6aa;
    --text-input-border: rgba(0,0,0,0.3);
    --text-link: hsl(197, calc(var(--saturation-factor, 1) * 100%), 47.8%);
    --text-danger: hsl(359, calc(var(--saturation-factor, 1) * 82%), 73.9%);
    
    --brand-experiment: hsl(235, calc(var(--saturation-factor, 1) * 85.6%), 64.7%);
    --brand-experiment-560: hsl(235, calc(var(--saturation-factor, 1) * 51.4%), 52.4%);
    --info-danger-foreground: hsl(359,calc(var(--saturation-factor, 1)*82.6%), 59.4%);
    --elevation-high: 0 8px 16px rgba(0,0,0,0.24);
    --interactive-normal: #b9bbbe;
    --channel-text-area-placeholder: #72767d;
    --channels-default: #96989d;

    --font-family-code: Consolas,Andale Mono WT,Andale Mono, Monaco,Courier New,Courier,monospace;
    --saturation-factor: 1;
  }
`;
