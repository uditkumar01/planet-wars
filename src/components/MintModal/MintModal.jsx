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
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  Badge,
} from "@chakra-ui/react";
import { useState } from "react";
import { IoMdPlanet } from "react-icons/all";
import { Planet3D } from "../Planet3D/Planet3D";

export function MintModal({
  generating,
  planetDetails,
  regenerationHandler,
  ipfsUploadHandler,
  onClick,
  writeContracts,
  address,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [inProgress, setInProgress] = useState(false);
  const [ipfsHash, setIpfsHash] = useState(null);

  async function mintStateHandler() {
    setInProgress(true);
    if (!ipfsHash) {
      const hash = await ipfsUploadHandler();
      setIpfsHash(hash);
    } else {
      await writeContracts.YourCollectible.mintItem(address, ipfsHash);
    }
    setInProgress(false);
  }
  // console.log(
  //   generating,
  //   planetDetails,
  //   regenerationHandler,
  //   ipfsUploadHandler,
  //   onClick,
  //   writeContracts,
  //   address,
  //   "MINT MODAL"
  // );
  return (
    <>
      <Button
        colorScheme="teal"
        display="flex"
        justifyContent="space-between"
        bg="brand.600"
        color="black.1000"
        _hover={{ bg: "brand.500" }}
        w="112px"
        position="fixed"
        bottom="30px"
        zIndex="1000"
        left="calc(50vw - 56px)"
        size="lg"
        onClick={() => {
          onOpen();
          onClick();
        }}
      >
        Mint <IoMdPlanet style={{ height: "30px" }} />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="whiteAlpha.700">Mint Planet</ModalHeader>
          <ModalCloseButton color="whiteAlpha.400" />
          <ModalBody>
            {generating ? (
              <Flex h="355px" justifyContent="center" alignItems="center">
                <Spinner size="xl" />
              </Flex>
            ) : (
              <Flex minH="355px" mb="1rem" flexDir="column" alignItems="center">
                {/*
                  <Flex
                    bg={`url(${planetDetails?.imageURL})`}
                    h="250px"
                    w="250px"
                    bgSize="cover"
                    bgPos="center"
                    borderRadius="50%"
                  ></Flex>
                */}
                <Planet3D scale={3} planetLink={planetDetails?.imageURL} />
                <Heading
                  textAlign="center"
                  m="2rem 0"
                  fontSize="1.9rem"
                  color="aqua"
                >
                  {planetDetails?.planetName.split("-").join(" ")}
                </Heading>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Property</Th>
                      <Th textAlign="right">Value</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {planetDetails &&
                      planetDetails.properties.map(({ name, value, unit }) => {
                        return (
                          <Tr key={name}>
                            <Th color="whiteAlpha.700">{name}</Th>
                            <Td textAlign="right">
                              <Badge
                                fontSize="0.76rem"
                                variant="solid"
                                bg="blackAlpha.300"
                              >
                                {value} {unit}
                              </Badge>
                            </Td>
                          </Tr>
                        );
                      })}
                  </Tbody>
                </Table>
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
              <Button
                colorScheme="blue"
                isLoading={inProgress || generating}
                onClick={mintStateHandler}
              >
                {ipfsHash ? "Mint Planet" : "IPFS Upload"}
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
