import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { theme } from "./theme";
import App from "./App";
import "./index.css";

const themes = {
  dark: `${process.env.PUBLIC_URL}/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/light-theme.css`,
};

const prevTheme = window.localStorage.getItem("theme");

const subgraphUri =
  "http://localhost:8000/subgraphs/name/scaffold-eth/your-contract";

const client = new ApolloClient({
  uri: subgraphUri,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ApolloProvider client={client}>
        <App subgraphUri={subgraphUri} />
      </ApolloProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
