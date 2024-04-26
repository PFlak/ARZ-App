import { useContext, useState } from "react";
import { AuthContext } from "../../../components/AuthProvider/AuthProvider";
import { useNavigate } from "react-router-dom";
import {
  AbsoluteCenter,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
} from "@chakra-ui/react";

function Login() {
  const alert = useDisclosure({ defaultIsOpen: false });
  const [alertDescription, setAlertDescribtion] = useState(
    "Oops... Something went wrong"
  );
  const [alertType, setAlertType] = useState<"error" | "info" | "success">(
    "error"
  );
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const showPassword = () => setShow(!show);

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  if (authContext?.loading) {
    return (
      <Box>
        <CircularProgress isIndeterminate color="blue.300" />
      </Box>
    );
  }

  if (authContext?.user) {
    navigate("/");
  }

  const handleLoginSubmit = async () => {
    console.log(authContext);
    await authContext
      ?.loginUser(email, password)
      .then((result) => {
        if (!result.user.emailVerified) {
          authContext.sendVerificationEmail(result.user).then(() => {
            authContext.logOut();
            setAlertType("info");
            setAlertDescribtion("Verification link was send to your email");
            alert.onOpen();
          });
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        authContext.skipLoading();
        setAlertType("error");
        setAlertDescribtion("Email or password are incorrect");
        alert.onOpen();
      });
  };

  const handleGoogleSubmit = async () => {
    const response = await authContext
      ?.signInWithGoogle()
      .then((result) => {
        if (!result.user.emailVerified) {
          authContext.sendVerificationEmail(result.user).then(() => {
            authContext.logOut();
            setAlertType("info");
            setAlertDescribtion("Verification link was send to your email");
            alert.onOpen();
          });
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        authContext.skipLoading();
        setAlertType("error");
        setAlertDescribtion("Oops... Something went wrong");
        alert.onOpen();
      });
  };

  return (
    <>
      <Box flexGrow={[1, 2, 1]}>
        <Heading as="h1" color="blue.500">
          Log In
        </Heading>
      </Box>

      <Box flexGrow={[1, 1, 1]}>
        {alert.isOpen ? (
          <Alert status={alertType}>
            <AlertIcon></AlertIcon>
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{alertDescription}</AlertDescription>
          </Alert>
        ) : (
          <Divider
            w={["100%", "60%", "60%"]}
            borderWidth="0.7px"
            borderColor="gray.300"
          ></Divider>
        )}
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
        <Button
          w="10rem"
          colorScheme="blue"
          variant="solid"
          onClick={handleLoginSubmit}
          isDisabled={email == "" || password == ""}
        >
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
        justifyContent="center"
        alignItems="center"
      >
        <Button
          w="10rem"
          colorScheme="blue"
          variant="outline"
          onClick={() => {
            navigate("/auth/signup");
          }}
        >
          Create Account
        </Button>
        <Divider display={["none", "block"]} orientation="vertical"></Divider>
        <Button
          w="10rem"
          colorScheme="blue"
          variant="solid"
          onClick={handleGoogleSubmit}
        >
          Sign In with Google
        </Button>
      </Box>
    </>
  );
}

export default Login;
