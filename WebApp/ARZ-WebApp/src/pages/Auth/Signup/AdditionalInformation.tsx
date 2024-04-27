import {
  AbsoluteCenter,
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
} from "@chakra-ui/react";

function AdditionalInformation() {
  return (
    <>
      <Box flexGrow={[1, 2, 1]}>
        <Heading as="h1" color="blue.500">
          Create Account
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
          ></Input>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              isRequired
              borderColor="gray.300"
              pr="4.5rem"
              placeholder="&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;"
            ></Input>
          </InputGroup>
          <FormHelperText>
            Password must be at least 8 characters
          </FormHelperText>
        </FormControl>
        <Button w="10rem" colorScheme="blue" variant="solid">
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
          onClick={() => {}}
        >
          Log In
        </Button>
        <Divider display={["none", "block"]} orientation="vertical"></Divider>
        <Button w="10rem" colorScheme="blue" variant="solid">
          Sign In with Google
        </Button>
      </Box>
    </>
  );
}

export default AdditionalInformation;
