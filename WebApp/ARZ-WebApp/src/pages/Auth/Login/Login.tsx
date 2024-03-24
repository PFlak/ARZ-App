import { useContext, useState } from "react";
import { AuthContext } from "../../../components/AuthProvider/AuthProvider";
import { useNavigate } from "react-router-dom";
import {
  AbsoluteCenter,
  Box,
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  useBreakpoint,
} from "@chakra-ui/react";

function Login() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  console.log(window.location.pathname);

  if (authContext?.loading) {
  }

  if (authContext?.user) {
    navigate("/");
  }

  const [show, setShow] = useState(false);
  const showPassword = () => setShow(!show);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Box flexGrow={[1, 2, 1]}>
        <Heading as="h1" color="blue.500">
          Log In
        </Heading>
      </Box>

      <Box flexGrow={[1, 1, 1]}>
        <Divider
          w={["100%", "60%"]}
          borderWidth="0.7px"
          borderColor="gray.300"
        ></Divider>
      </Box>

      <Box
        w="100%"
        display="flex"
        flexDir="column"
        justifyContent="space-between"
        alignItems="center"
        flexGrow={[1, 2, 3]}
      >
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            borderColor="gray.300"
            variant="outline"
            placeholder="abcd@domain.com"
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              isRequired
              borderColor="gray.300"
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;"
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={showPassword}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button w="10rem" colorScheme="blue" variant="solid">
          Log In
        </Button>
      </Box>

      <Box
        display="flex"
        w="100%"
        flexGrow={[1, 2, 1]}
        justifyContent="center"
        alignItems="flex-end"
      >
        <Box position="relative" padding="10" w="60%" h="1rem">
          <Divider borderWidth="0.7px" borderColor="gray.300"></Divider>
          <AbsoluteCenter bg="whitesmoke" px="4">
            Or
          </AbsoluteCenter>
        </Box>
      </Box>
      <Box
        display="flex"
        flexDir={["column", "row"]}
        columnGap="2rem"
        rowGap="1rem"
        flexGrow={[1, 1, 1]}
      >
        <Button w="10rem" colorScheme="blue" variant="outline">
          Sign In
        </Button>
        <Divider display={["none", "block"]} orientation="vertical"></Divider>
        <Button w="10rem" colorScheme="blue" variant="solid">
          Sign In with Google
        </Button>
      </Box>
    </>
  );
}

export default Login;
