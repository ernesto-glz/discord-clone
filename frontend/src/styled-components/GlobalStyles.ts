import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-rendering: optimizeLegibility;
  }
  html, body, #root {
    height: 100%;
    background-color: var(--background-primary);
    text-rendering: optimizeLegibility;
  }
  *, button, input {
    border: 0;
    outline: 0;
    font-family: 'Whitney';
  }
  a {
    color: var(--text-link);
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  pre {
    box-sizing: border-box;
    max-width: 90%;
    border-radius: 4px;
    padding: 0;
    font-family:  var(--font-family-code);
    font-size: 0.75rem;
    line-height: 1rem;
    margin-top: 10px;
  }
  code {
    padding: 0.2em;
    margin: -0.2em 0;
    border-radius: 3px;
    font-size: 85%;
    font-family: var(--font-family-code);
    text-indent: 0;
    border: none;
    white-space: pre-wrap;
    background: var(--secondary);
    color: var(--text-normal);
  }
  pre > code {
    font-size: 0.875rem;
    line-height: 1.125rem;
    text-indent: 0;
    width: 100%;
    white-space: pre-wrap;
    scrollbar-width: thin;
    scrollbar-color: var(--background-tertiary) var(--background-secondary);
    background: var(--secondary);
    border: 1px solid var(--background-tertiary);
    display: block;
    overflow-x: auto;
    padding: 0.5em;
    border-radius: 4px;
    color: var(--header-secondary);
  }
  .App {
    background-color: var(--background-primary);
    min-height: 100vh;
    width: 100vw;
    font-size: calc(10px + 2vmin);
    color: white;
    box-sizing: border-box;
    text-rendering: optimizeLegibility;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
  }
  :root {
    --primary: #36393f;
    --secondary: #2f3136;
    --tertiary: rgb(32,34,37);
    --quaternary: #292b2f;
    --quinary: #393d42;
    --senary: #828386;
    
    --white: #fff;
    --gray: #8a8c90;
    --green: #3ba55d;
    --chat-input: rgb(64,68,75);
    --symbol: #74777a;
    --notification: #f84a4b;
    --discord: #6e86d6;
    --mention-detail: #f9a839;
    --mention-message: #413f3f;
    --link: #5d80d6;
    --accountfy: #67DE98;

    --header-primary: #fff;
    --header-secondary: #b9bbbe;
    --background-primary: #232428;
    --background-secondary: #292b2f;
    --background-inactive: #72767c;
    --background-primary: #36393f;
    --background-mobile-primary: #36393f;
    --text-normal: #DCDDDE;
    --input-background: #202225;
    --brand-experiment: hsl(
      235,
      calc(var(--saturation-factor, 1) * 85.6%),
      64.7%
    );
    --brand-experiment-560: hsl(
      235,
      calc(var(--saturation-factor, 1) * 51.4%),
      52.4%
    );
    --text-input-border: rgba(0,0,0,0.3);
    --text-link: hsl(197, calc(var(--saturation-factor, 1) * 100%), 47.8%);
    --text-danger: hsl(359, calc(var(--saturation-factor, 1) * 82%), 73.9%);
    --background-tertiary: #202225;
    --background-modifier-accent: rgba(79,84,92,0.48);
    --background-modifier-selected: rgba(79,84,92,0.6);
    --background-modifier-hover: rgba(79,84,92,0.4);
    --info-danger-foreground: hsl(359,calc(var(--saturation-factor, 1)*82.6%),59.4%);
    --background-message-hover: rgba(4,4,5,0.07);
    --saturation-factor: 1;
    --background-floating: #18191c;
    --elevation-high: 0 8px 16px rgba(0,0,0,0.24);
    --interactive-normal: #b9bbbe;
    --font-family-code: Consolas,Andale Mono WT,Andale Mono, Monaco,Courier New,Courier,monospace;
  }
`;
