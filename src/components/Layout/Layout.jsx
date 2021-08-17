import { DarkMode, Flex } from "@chakra-ui/react";

export function Layout({ children }) {
  return (
    <DarkMode>
      <Flex
        flexDirection="column"
        alignItems="center"
        bg="black.1000"
        minH="100vh"
        minW="100vw"
      >
        {children}
      </Flex>
    </DarkMode>
  );
}
