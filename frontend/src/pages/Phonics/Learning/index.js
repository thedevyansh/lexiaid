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
        <title>Assessment</title>
      </Helmet>
      <Heading>Module 1</Heading>
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        m="10%"
      >
        <Card>
          <CardHeader>
            <Heading size="md">/k/</Heading>
          </CardHeader>
          <CardBody>
            <Text>Identify the spoken word</Text>
          </CardBody>
          <Button>Craft</Button>
          <Button>Car</Button>
          <Button>Cat</Button>
        </Card>
      </SimpleGrid>
    </Flex>
  );
}

export default index;
