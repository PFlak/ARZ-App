import { ReactNode, useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

interface Props {
  children?: ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
  const context = useContext(AuthContext);

  if (context?.loading) {
    return <span className="loading loading-dots loading-lg"></span>;
  }

  if (context?.user) {
    return children;
  }

  return <Navigate to="/login" />;
};

export default PrivateRoute;
