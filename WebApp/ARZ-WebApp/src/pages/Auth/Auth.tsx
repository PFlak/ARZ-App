import { Box, Flex, useBreakpoint } from "@chakra-ui/react";
import { BrowserRouter, Outlet } from "react-router-dom";

function Auth() {
  return (
    <Flex w="100vw" h="100vh" justifyContent="center" alignItems="center">
      <Box
        bg="whitesmoke"
        w={["100%", "100%", "30em", "35em", "38em", "39em"]}
        height={["100%", "100%", "auto"]}
        maxH={["none", "none", "80%"]}
        aspectRatio="10/15"
        borderRadius={useBreakpoint()}
        boxShadow={useBreakpoint()}
        display="flex"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        px={["1em", "7em"]}
        py={["4em", "4em", "4em"]}
        rowGap={["2em"]}
      >
        <Outlet></Outlet>
      </Box>
    </Flex>
  );
}

export default Auth;
