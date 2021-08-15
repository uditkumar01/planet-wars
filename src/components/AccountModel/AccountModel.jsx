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
        bg="brand.500"
        _hover={{ bg: "brand.600" }}
      >
        Account
      </Button>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex minH="355px" mb="1rem" flexDir="column" alignItems="center">
              <Flex h="200px" w="200px" bgSize="cover" bgPos="center">
                <QRCode
                  size="200"
                  bgColor="#2d3748"
                  fgColor="cyan"
                  includeMargin={true}
                  value="http://facebook.github.io/react/"
                />
              </Flex>
              <Table size="sm" m="1rem 0">
                <Tbody>
                  <Tr>
                    <Th>Address</Th>
                    <Td
                      whiteSpace="nowrap"
                      overflowWrap="break-word"
                      wordBreak="break-word"
                      maxW="100px"
                      overflow="hidden"
                      textOverflow="ellipsis"
                    >
                      {address}
                    </Td>
                  </Tr>
                  <Tr>
                    <Th>Balance</Th>
                    <Td>{yourBalance}</Td>
                  </Tr>
                </Tbody>
                <br />
              </Table>
              <Flex>
                <Button
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
