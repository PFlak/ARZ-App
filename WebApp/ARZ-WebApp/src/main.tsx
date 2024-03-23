import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route, redirect } from "react-router-dom";
import Auth from "./pages/Auth/Auth.tsx";
import Background from "./components/Background/Background.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <Background></Background>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<App></App>}></Route>
          <Route path="/auth" element={<Auth></Auth>}></Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
