import { React, useState, useEffect } from "react";
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
  Progress,
  SimpleGrid,
  Tag,
  TagRightIcon,
  TagLabel,
} from "@chakra-ui/react";
import { BiCheckCircle, BiLock } from "react-icons/bi";
import { useSelector } from "react-redux";
import { getChapters } from "../../../services/phonics";

export default function App() {
  const user = useSelector((state) => state.user);
  const [chapters, setChapters] = useState([]);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [currentModule, setCurrentModule] = useState(0);
  const [chapterProgress, setChapterProgress] = useState(0);

  const getData = async () => {
    const d = (await getChapters()).data;
    console.log(d);
    setChapters(d?.all_chapters);
    setCurrentChapter(d?.current_chapter);
    setChapterProgress(d?.chapter_progress);
    setCurrentModule(d?.current_module);
  };
  useEffect(() => getData, []);
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
        {Array.from({ length: currentChapter }).map((it, index) => (
          <Card
            border="2px"
            borderColor="green.300"
            boxShadow="xl"
            p="8"
            rounded="md"
            key={index}
          >
            <CardHeader>
              <Heading size="md">{chapters[index]?.name}</Heading>
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
        ))}
        <Card
          border="2px"
          borderColor="yellow.200"
          boxShadow="xl"
          p="8"
          rounded="md"
        >
          <CardHeader>
            <Heading size="md">{chapters[currentChapter]?.name}</Heading>
          </CardHeader>
          <CardBody>
            <Progress value={34} colorScheme="yellow"></Progress>
            <Text>{chapterProgress + "%"}</Text>
          </CardBody>
          <CardFooter>
            {/* <Button colorScheme="gray" variant="outline">Continue</Button> */}
            <Link
              to={{
                pathname: "/phonics/learning",
                state: { chapter: currentChapter, module: currentModule },
              }}
            >
              <Button colorScheme="yellow" variant="outline">
                Continue
              </Button>
            </Link>
          </CardFooter>
        </Card>
        {Array.from({ length: chapters?.length - currentChapter - 1 }).map(
          (it, index) => (
            <Card
              border="2px"
              borderColor="gray.300"
              boxShadow="xl"
              p="8"
              rounded="md"
              key={index}
            >
              <CardHeader>
                <Heading size="md">
                  {" "}
                  {chapters[index + currentChapter + 1]?.name}{" "}
                </Heading>
              </CardHeader>
              <CardBody>
                <Tag size="lg">
                  <TagLabel>Locked</TagLabel>
                  <TagRightIcon boxSize="5" as={BiLock} />
                </Tag>
                <Text padding={"4px"}>Complete previous modules to unlock</Text>
              </CardBody>
            </Card>
          )
        )}
      </SimpleGrid>
    </Flex>
  );
}
