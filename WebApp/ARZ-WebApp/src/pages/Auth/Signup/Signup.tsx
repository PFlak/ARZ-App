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
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
} from "@chakra-ui/react";
import { UserCredential } from "firebase/auth";

function Signup() {
  const alert = useDisclosure({ defaultIsOpen: false });
  const [alertDescription, setAlertDescribtion] = useState(
    "Something went wrong"
  );
  const [alertType, setAlertType] = useState<"error" | "info" | "success">(
    "error"
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

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

  const createUnAuthorizedUser = async (userCredential: UserCredential) => {
    if (userCredential.user.email) {
      authContext
        ?.createUnAuthorizedUser(
          userCredential.user.uid,
          userCredential.user.email
        )
        .then((value) => {
          if (value) {
            navigate("/");
          }
        })
        .catch(() => {
          setAlertType("error");
          alert.onOpen();
        })
        .finally(() => {
          authContext.skipLoading();
        });
    }
  };

  const handleGoogleSubmit = async () => {
    await authContext
      ?.signInWithGoogle()
      .then(async (result) => {
        if (!result.user.emailVerified) {
          authContext.sendVerificationEmail(result.user).then(() => {
            authContext.logOut();
            setAlertType("info");
            setAlertDescribtion("Verification link was send to your email");
            alert.onOpen();
          });

          return;
        }

        createUnAuthorizedUser(result);
      })
      .catch((error) => {
        authContext.skipLoading();
        setAlertDescribtion("Oops... something went wrong");
        alert.onOpen();
      });
  };

  const handleSignUpSubmit = async () => {
    authContext
      ?.createUser(email, password)
      .then((result) => {
        authContext.sendVerificationEmail(result.user).then(() => {
          authContext.logOut();
          setAlertType("info");
          setAlertDescribtion("Verification link was send to your email");
          alert.onOpen();
        });
        createUnAuthorizedUser(result);
      })
      .catch((error) => {
        authContext.skipLoading();
        setAlertDescribtion("User exists");
        alert.onOpen();
      });
  };

  return (
    <>
      <Box flexGrow={[1, 2, 1]}>
        <Heading as="h1" color="blue.500">
          Create Account
        </Heading>
      </Box>

      <Box flexGrow={[1, 1, 1]}>
        {alert.isOpen ? (
          <Alert status={alertType}>
            <AlertIcon></AlertIcon>
            <AlertTitle></AlertTitle>
            <AlertDescription>{alertDescription}</AlertDescription>
          </Alert>
        ) : (
          <Divider
            w={["100%", "60%"]}
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
              type={showPassword ? "text" : "password"}
              placeholder="&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;"
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormHelperText>
            Password must be at least 8 characters
          </FormHelperText>
        </FormControl>
        <Button
          w="10rem"
          colorScheme="blue"
          variant="solid"
          onClick={handleSignUpSubmit}
          isDisabled={email == "" || password.length < 8}
        >
          Create Account
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
            navigate("/auth/login");
          }}
        >
          Log In
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

export default Signup;
