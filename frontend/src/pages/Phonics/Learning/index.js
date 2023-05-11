import React from "react";
import { Helmet } from "react-helmet-async";
import {
  Heading,
  Text,
  Flex,
  Card,
  CardHeader,
  IconButton,
} from "@chakra-ui/react";
import { BiRepeat, BiSkipPrevious, BiSkipNext } from "react-icons/bi";

function index() {
  const words=["can","car","cap"]
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      m="4%"
    >
      <Helmet>
        <title>Phonics Learning Area</title>
      </Helmet>
      <Text size="md" letterSpacing={1}>
        MODULE 1
      </Text>
      <Heading>Basic Phonemes</Heading>
      <Card
        align="center"
        marginTop="5%"
        padding="2%"
        boxShadow="xl"
        p="6"
        rounded="lg"
        background="#f8fd89"
      >
        <CardHeader>
          <Heading size="4xl"> /k/</Heading>
        </CardHeader>
      </Card>
      <Flex
        flexDirection="row"
        w="40%"
        justifyContent="space-between"
        wrap="nowrap"
        marginTop="3%"
        fontSize="3xl"
      >
        {
          words.map((key,idx)=> <Card padding="1% 4%" boxShadow="md" border="1px" borderColor="gray.200">
          {key}
        </Card>)
        }
      </Flex>
      <Flex
        flexDirection="row"
        w="15%"
        justifyContent="space-between"
        alignItems="center"
        wrap="nowrap"
        marginTop="3%"
        fontSize="3xl"
      >
        <IconButton
          variant="outline"
          colorScheme="green"
          aria-label="Replay"
          fontSize="3xl"
          borderRadius="100%"
          size="lg"
          icon={<BiSkipPrevious />}
        />
        <IconButton
          variant="outline"
          colorScheme="green"
          aria-label="Replay"
          fontSize="3xl"
          boxSize="20"
          rounded="100%"
          icon={<BiRepeat />}
        />
        <IconButton
          variant="outline"
          colorScheme="green"
          aria-label="Replay"
          fontSize="3xl"
          borderRadius="100%"
          size="lg"
          icon={<BiSkipNext />}
        />
      </Flex>
    </Flex>
  );
}

export default index;
