import {
  chakra,
  Flex,
  VisuallyHidden,
  HStack,
  Box,
  Button,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";


export function Navbar() {
  const bg = useColorModeValue("white", "gray.800");

  return (
    <>
      <chakra.header
        bg={bg}
        w="full"
        px={{ base: 2, sm: 4 }}
        py={4}
        shadow="md"
        zIndex="2"
        position="fixed"
        top="0"
        left="0"
      >
        <Flex
          alignItems="center"
          justifyContent="space-between"
          mx="auto"
          maxWidth="1500px"
        >
          <Flex>
            <chakra.a
              href="/"
              title="CredoPay"
              display="flex"
              alignItems="center"
            >
              <Image src="/images/logo.png" height="40px" />
              <VisuallyHidden display="flex" alignItems="center">
                Planet Wars
              </VisuallyHidden>
            </chakra.a>
            <chakra.h1
              display="flex"
              alignItems="center"
              fontSize="xl"
              fontWeight="medium"
              ml="2"
            >
              Planet Wars
            </chakra.h1>
          </Flex>
          <HStack display="flex" alignItems="center" spacing={1}>
            <HStack
              spacing={1}
              mr={1}
              color="brand.500"
              display={{ base: "none", md: "inline-flex" }}
            ></HStack>

            <Button
              colorScheme="teal"
              display="flex"
              justifyContent="space-between"
              bg="brand.500"
              _hover={{ bg: "brand.600" }}
              minW="75px"
              size="sm"
            >
              Account
            </Button>
          </HStack>
        </Flex>
      </chakra.header>
      <Box height="72px" overflow="hidden" width="100%">
        .
      </Box>
    </>
  );
}
