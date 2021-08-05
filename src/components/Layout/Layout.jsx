import { Flex } from "@chakra-ui/react";
import { Navbar } from "../Navbar/Navbar";

export function Layout({ children }) {
  return (
    <Flex flexDirection="column" alignItems="center" alignItems="center">
      <Navbar />
      {children}
    </Flex>
  );
}
