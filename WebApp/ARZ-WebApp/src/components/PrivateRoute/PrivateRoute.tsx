import { ReactNode, useContext, useEffect, useRef } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import PropTypes from "prop-types";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { Box, CircularProgress, ToastId, useToast } from "@chakra-ui/react";

interface Props {
  children?: ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  if (context?.loading) {
    return (
      <Box
        w="100%"
        h="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          w="20rem"
          borderRadius="2rem"
          aspectRatio="1"
          bg="whitesmoke"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress isIndeterminate color="blue.300"></CircularProgress>
        </Box>
      </Box>
    );
  }

  if (context?.user) {
    return children;
  } else {
    navigate("/auth/login");
  }

  // useEffect(() => {
  //   const navigateToLogin = () => {
  //     navigate("/auth/login");
  //   };

  //   navigateToLogin();
  // }, []);
};

export default PrivateRoute;
