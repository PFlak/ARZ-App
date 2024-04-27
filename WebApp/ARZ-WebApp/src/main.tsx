import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import Background from "./components/Background/Background.tsx";
import App from "./App.tsx";
import AuthProvider from "./components/AuthProvider/AuthProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <Background></Background>
      <AuthProvider>
        <App></App>
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);
