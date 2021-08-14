import { Flex } from "@chakra-ui/react";

export function Layout({ children }) {
  return (
    <Flex flexDirection="column" alignItems="center">
      {children}
    </Flex>
  );
}
