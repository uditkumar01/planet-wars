import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Navbar } from "../Navbar/Navbar";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <Flex flexDirection="column" alignItems="center">
      <Navbar />
      {children}
    </Flex>
  );
}
