import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Heading,
  Text,
  Flex,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Icon,
  Progress,
  SimpleGrid,
  Tag,
  TagRightIcon,
  TagLabel,
} from "@chakra-ui/react";
import { BiCheckCircle, BiLock } from "react-icons/bi";
import { useSelector } from "react-redux";

export default function App() {
  const user = useSelector((state) => state.user);
  return (
    <Flex alignItems="center" flexDirection="column" m="4%">
      <Helmet>
        <title>Phonics</title>
      </Helmet>
      <Heading as="h1">
        Welcome back, {user.googleName ?? user.username}{" "}
      </Heading>
      <Text marginTop="4" fontSize="lg">
        Let's continue learning phonics!
      </Text>
      <SimpleGrid spacing={4} columns={2} m="5%">
      <Card
          border="2px"
          borderColor="green.300"
          boxShadow="xl"
          p="8"
          rounded="md"
        >
          <CardHeader>
            <Heading size="md"> Elementary Phonics-I </Heading>
          </CardHeader>
          <CardBody>
            <Progress value={100} colorScheme="green"></Progress>
            100% <br></br>
            <Tag marginTop="8" size="lg" colorScheme="green">
              <TagLabel>Completed</TagLabel>
              <TagRightIcon boxSize="5" as={BiCheckCircle} />
            </Tag>
          </CardBody>
        </Card>
        <Card
          border="2px"
          borderColor="yellow.200"
          boxShadow="xl"
          p="8"
          rounded="md"
        >
          <CardHeader>
            <Heading size="md"> Elementary Phonics-II</Heading>
          </CardHeader>
          <CardBody>
            <Progress value={34} colorScheme="yellow"></Progress>
            <Text>34%</Text>
          </CardBody>
          <CardFooter>
            {/* <Button colorScheme="gray" variant="outline">Continue</Button> */}
            <Link to="/assessment">
              <Button colorScheme="yellow" variant="outline">
                Continue
              </Button>
            </Link>
          </CardFooter>
        </Card>
        <Card
          border="2px"
          borderColor="gray.300"
          boxShadow="xl"
          p="8"
          rounded="md"
        >
          <CardHeader>
            <Heading size="md"> Homophones </Heading>
          </CardHeader>
          <CardBody>
            <Tag size="lg">
              <TagLabel>Locked</TagLabel>
              <TagRightIcon boxSize="5" as={BiLock} />
            </Tag>
            <Text padding={"4px"}>Complete previous modules to unlock</Text>
          </CardBody>
        </Card>
      </SimpleGrid>
    </Flex>
  );
}
