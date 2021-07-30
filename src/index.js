import { ColorModeScript, ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom";
import React from "react";
import * as serviceWorker from "./serviceWorker";
import App from "./App/App";
import { theme } from "./theme";

ReactDOM.render(
    <React.StrictMode>
        <ChakraProvider resetCSS theme={theme}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <App />
        </ChakraProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();