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
  SimpleGrid,
} from "@chakra-ui/react";

function index() {
  return (
    <Flex alignItems="center" flexDirection="column" m="12%">
      <Helmet>
        <title>Phonics</title>
      </Helmet>
      <Heading>Phonics module</Heading>
      <Text textAlign="center">Your Progress</Text>
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        m="10%"
      >
        <Card backgroundColor="green" textColor="white">
          <CardHeader>
            <Heading size="md"> Elementary phonics</Heading>
          </CardHeader>
          <CardBody>
            <Text>34%</Text>
          </CardBody>
          <CardFooter>
            {/* <Button colorScheme="gray" variant="outline">Continue</Button> */}
            <Link to="/assessment">
              <Button colorScheme="gray" variant="outline">
                Continue
              </Button>
            </Link>
          </CardFooter>
        </Card>
        <Card colorScheme="gray">
          <CardHeader>
            <Heading size="md"> Homophones</Heading>
          </CardHeader>
          <CardBody>
            <Text>Locked</Text>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <Heading size="md">Words</Heading>
          </CardHeader>
          <CardBody>
            <Text>Locked</Text>
          </CardBody>
        </Card>
      </SimpleGrid>
    </Flex>
  );
}

export default index;
