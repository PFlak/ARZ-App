import { ReactNode, useContext, useEffect } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import PropTypes from "prop-types";
import { Navigate, Link, useNavigate } from "react-router-dom";

interface Props {
  children?: ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  if (context?.loading) {
    return <span className="loading loading-dots loading-lg"></span>;
  }

  if (context?.user) {
    return children;
  }

  useEffect(() => {
    const navigateToLogin = () => {
      navigate("auth/login");
    };

    navigateToLogin();
  });
};

export default PrivateRoute;
