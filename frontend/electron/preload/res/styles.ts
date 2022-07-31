export const styleContent = `
  .loading-app {
    font-size: calc(10px + 2vmin);
    color: white;
    box-sizing: border-box;
    text-rendering: optimizeLegibility;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    overflow: hidden;
  }

  .loading-spinner {
    width: 200px;
    height: 200px;
  }

  .background-spinner {
    box-sizing: border-box;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #2f3136;
    z-index: 3000;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }

  .title {
    text-transform: uppercase;
    font-size: 13px;
    color: #fff;
    line-height: 20px;
    font-family: Whitney;
  }
  .tip {
    margin-top: 5px;
    max-width: 300px;
    color: #b9bbbe;
    font-size: 17px;
    line-height: 21px;
    text-align: center;
    font-family: Whitney;
  }
`;
