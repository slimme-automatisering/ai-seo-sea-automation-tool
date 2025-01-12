import { Global } from '@emotion/react';

const GlobalStyles = () => (
  <Global
    styles={`
      body {
        margin: 0;
        padding: 0;
        background-color: #f5f5f5;
        font-family: 'Roboto', sans-serif;
      }
    `}
  />
);

export default GlobalStyles;
