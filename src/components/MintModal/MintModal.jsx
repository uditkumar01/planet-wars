import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Flex,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import { IoMdPlanet } from "react-icons/all";

export function MintModal({
  generating,
  planetDetails,
  regenerationHandler,
  mint,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        colorScheme="teal"
        display="flex"
        justifyContent="space-between"
        bg="brand.500"
        _hover={{ bg: "brand.600" }}
        w="112px"
        position="fixed"
        bottom="30px"
        left="calc(50vw - 56px)"
        size="lg"
        onClick={onOpen}
      >
        Mint <IoMdPlanet style={{ height: "30px" }} />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Mint Planet</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {generating ? (
              <Flex h="355px" justifyContent="center" alignItems="center">
                <Spinner size="xl" />
              </Flex>
            ) : (
              <Flex
                minH="355px"
                mb="1rem"
                flexDir="column"
                alignItems="center"
                minH="300px"
              >
                <Flex
                  bg={`url(${planetDetails?.imageURL})`}
                  h="250px"
                  w="250px"
                  bgSize="cover"
                  bgPos="center"
                  borderRadius="50%"
                ></Flex>
                <Heading textAlign="center" m="2rem 0" fontSize="1.9rem">
                  {planetDetails?.planetName.split("-").join(" ")}
                </Heading>
              </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Flex w="100%" justifyContent="space-between">
              <Button
                colorScheme="blue"
                variant="outline"
                mr={3}
                onClick={regenerationHandler}
                isLoading={generating}
              >
                Regenerate
              </Button>
              <Button colorScheme="blue" onClick={mint}>
                Mint Planet
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
