import { BrowserRouter, Route, Router, Routes } from "react-router-dom";

import "./App.css";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Auth from "./pages/Auth/Auth";
import Login from "./pages/Auth/Login/Login";
import Signup from "./pages/Auth/Signup/Signup";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="" element={<PrivateRoute></PrivateRoute>}></Route>
        <Route path="auth" element={<Auth></Auth>}>
          <Route path="" element={<Login></Login>}></Route>
          <Route path="signup" element={<Signup></Signup>}></Route>
          <Route path="login" element={<Login></Login>}></Route>
        </Route>
        <Route path="*" element={<PrivateRoute></PrivateRoute>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
