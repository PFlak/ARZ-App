import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Image,
} from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../../../components/AuthProvider/AuthProvider";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/logo/Logo.svg";

function Navbar() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <Box
      w="100%"
      h="100%"
      top="0"
      left="0"
      display="flex"
      px={["2%", "2%", "3%", "3%", "3%", "3%"]}
      // py="5px"
      flexDir="row"
      justifyContent="space-between"
      alignItems="center"
    >
      {/* Logo */}
      <Box h="80%" w="auto" aspectRatio="1">
        <Image src={Logo} />
      </Box>
      {/* Avatar */}

      <Menu>
        <MenuButton
          as={Avatar}
          src={authContext?.user?.photoURL ?? ""}
          bg="gray.400"
          cursor="pointer"
          boxShadow="0px 0px 5px gray;"
          aspectRatio="1"
          h="80%"
          w="auto"

          // boxSize={["1.5rem", "1.5rem", "2rem", "2rem", "2rem", "3rem"]}
        ></MenuButton>
        <MenuList>
          <MenuItem
            icon={<ArrowBackIcon></ArrowBackIcon>}
            onClick={async () => {
              authContext
                ?.logOut()
                .then(() => {
                  console.log("logout success");
                  navigate("/auth");
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
          >
            Log out
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
}

export default Navbar;
