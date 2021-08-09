import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./App/App";
import reportWebVitals from './reportWebVitals';
import { ColorModeScript, ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme";
import * as dotenv from "dotenv";

dotenv.config();

// const INFURA_API_KEY = process.env.INFURA_API_KEY;

// const config = {
//   readOnlyChainId: ChainId.Ropsten,
//   readOnlyUrls: {
//     [ChainId.Ropsten]: `https://ropsten.infura.io/v3/${INFURA_API_KEY}`,
//   },
// }

// const config = {
//   readOnlyChainId: ChainId.Localhost,
//   readOnlyUrls: {
//     [ChainId.Localhost]: `localhost:8545`,
//   },
// }

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
