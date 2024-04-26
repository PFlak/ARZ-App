import { Grid, GridItem } from "@chakra-ui/react";
import Navbar from "./components/Navbar";

function Home() {
  return (
    <Grid
      templateAreas={[
        `"navbar navbar" "sidenav sidenav" "main main"`,
        `"navbar navbar" "sidenav sidenav" "main main"`,
        `"navbar navbar" "sidenav main"`,
      ]}
      h="100vh"
      w="100%"
      gap="1"
      gridTemplateRows={[
        "3rem 3rem 1fr",
        "3rem 3rem 1fr",
        "3rem 1fr",
        "3.5rem 1fr",
        "3.5rem 1fr",
        "4rem 1fr",
      ]}
      gridTemplateColumns={[
        "1fr",
        "1fr",
        "5rem 1fr",
        "5.5rem 1fr",
        "5.5rem 1fr",
        "6rem 1fr",
      ]}
      borderRadius="1px"
    >
      <GridItem zIndex="100" bg="whiteAlpha.700" area={"navbar"}>
        <Navbar></Navbar>
      </GridItem>
      <GridItem
        borderRadius="3px"
        bg="whiteAlpha.700"
        area={"sidenav"}
      ></GridItem>
      <GridItem
        borderRadius="3px"
        filter="blur(0px)"
        bg="whiteAlpha.700"
        area={"main"}
      ></GridItem>
    </Grid>
  );
}

export default Home;
