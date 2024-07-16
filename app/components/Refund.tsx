import React, { useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useWallet } from "@alephium/web3-react";
import { prettifyAttoAlphAmount } from "@alephium/web3";

interface RefundProps {
  callRefund: () => Promise<void>;
  accountContributionAmount: bigint | undefined;
  isEndReached: boolean;
}

export const Refund: React.FC<RefundProps> = ({
  callRefund,
  accountContributionAmount,
  isEndReached,
}) => {
  const cancelRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { connectionStatus } = useWallet();

  const handleRefund = async () => {
    await callRefund();
    onClose();
  };

  return (
    <>
      <Box mt={4}>
        <Button
          colorScheme={"orange"}
          onClick={onOpen}
          isDisabled={
            connectionStatus !== "connected" ||
            accountContributionAmount === 0n ||
            isEndReached
          }
        >
          Refund
        </Button>
      </Box>
      <AlertDialog
        isOpen={isOpen}
        // @ts-ignore
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Refund
            </AlertDialogHeader>

            <AlertDialogBody>
              <Text mt={2} textAlign={"center"}>
                By confirming this action, you will be refunded{" "}
                {prettifyAttoAlphAmount(accountContributionAmount!)} ALPH
              </Text>
            </AlertDialogBody>
            <AlertDialogFooter>
              {/* @ts-ignore*/}
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="orange" onClick={handleRefund} ml={3}>
                Refund
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
