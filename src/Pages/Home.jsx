import { Box } from "@chakra-ui/react";
import React from "react";
import Chat from "../components/Chat";
import Navbar from "../components/Navbar";
import SiderBar from "../components/SiderBar";

function Home() {
  return (
    <>
   <Navbar />
      <Box className="home">
      <SiderBar />
      <Chat />
      </Box>
    </>
  );
}

export default Home;
