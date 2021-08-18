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

export function PlanetModal({ children, planetDetails }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Flex onClick={onOpen} cursor="pointer">
        {children}
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="whiteAlpha.700">Mint Planet</ModalHeader>
          <ModalCloseButton color="whiteAlpha.400" />
          <ModalBody>
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
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
