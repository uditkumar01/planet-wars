import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  Td,
  Th,
  Tbody,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import QRCode from "qrcode.react";

export function AccountModel({ address, yourBalance, logoutOfWeb3Modal }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  return (
    <>
      <Button
        onClick={onOpen}
        colorScheme="teal"
        bg="brand.600"
        color="black.1000"
        h={["30px", "40px"]}
        w={["85px", "90px"]}
        fontSize={["sm", "md"]}
        _hover={{ bg: "brand.500" }}
      >
        Account
      </Button>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        bg="black.1000"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="whiteAlpha.700">Account</ModalHeader>
          <ModalCloseButton color="whiteAlpha.400" />
          <ModalBody>
            <Flex minH="355px" mb="1rem" flexDir="column" alignItems="center">
              <Flex h="200px" w="200px" bgSize="cover" bgPos="center">
                <QRCode
                  size="200"
                  bgColor="black.1000"
                  fgColor="cyan"
                  includeMargin={true}
                  value="http://facebook.github.io/react/"
                />
              </Flex>
              <Table size="sm" m="1rem 0">
                <Tbody>
                  <Tr>
                    <Th color="whiteAlpha.700">Address</Th>
                    <Td
                      whiteSpace="nowrap"
                      overflowWrap="break-word"
                      wordBreak="break-word"
                      maxW="100px"
                      overflow="hidden"
                      textOverflow="ellipsis"
                      color="whiteAlpha.700"
                    >
                      {address}
                    </Td>
                  </Tr>
                  <Tr>
                    <Th color="whiteAlpha.700">Balance</Th>
                    <Td color="whiteAlpha.700">{yourBalance}</Td>
                  </Tr>
                </Tbody>
                <br />
              </Table>
              <Flex>
                <Button
                  bg="brand.600"
                  color="black.1000"
                  _hover={{ bg: "brand.500" }}
                  mr="1rem"
                  onClick={() => {
                    if (address) {
                      navigator.clipboard.writeText(address);
                      toast.success("Copied to clipboard");
                    } else {
                      toast.error("No address");
                    }
                  }}
                >
                  Copy Address
                </Button>
                <Button
                  bg="brand.600"
                  color="black.1000"
                  _hover={{ bg: "brand.500" }}
                  onClick={() => {
                    logoutOfWeb3Modal();
                  }}
                >
                  logout
                </Button>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
