import React,{useState} from "react";
import { Helmet } from "react-helmet-async";
import {
  Button,
  Heading,
  Text,
  Flex,
  Card,
  CardHeader,
  IconButton,
  Spinner
} from "@chakra-ui/react";
import {
  BiRepeat,
  BiSkipPrevious,
  BiSkipNext,
  BiVolumeFull,
} from "react-icons/bi";

export default function App() {
  const words = ["can", "car", "cap"];
  const [isSoundActive, handleSound]=useState(false);
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      m="4%"
    >
      <Helmet>
        <title>Phonics Assessment Area</title>
      </Helmet>
      <Text size="md" letterSpacing={1}>
        MODULE 1 PRACTICE
      </Text>
      <Heading>Basic Phonemes</Heading>
      <Text size="sm" marginTop="3">
        Identify the words that contain the spoken phoneme
      </Text>
      <Card
        align="center"
        marginTop="5%"
        padding="2%"
        boxShadow="xl"
        p="6"
        rounded="100"
        backgroundColor={isSoundActive?"orange.300":"orange.100"}
        border="2px"
        borderColor="yellow.200"
      >
        <CardHeader>
          <Heading size="4xl">
            <BiVolumeFull></BiVolumeFull>
          </Heading>
        </CardHeader>
      </Card>
      <Flex
        flexDirection="row"
        w="40%"
        justifyContent="space-between"
        wrap="nowrap"
        marginTop="3%"
        
      >
        {words.map((key, idx) => (
          <Button
            padding="5%"
            boxShadow="md"
            border="1px"
            borderColor="gray.200"
            fontSize="3xl"
          >
            {key}
          </Button>
        ))}
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
