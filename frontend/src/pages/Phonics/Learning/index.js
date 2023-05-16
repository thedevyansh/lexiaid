import { React, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  Heading,
  Text,
  Flex,
  Card,
  CardHeader,
  IconButton,
} from "@chakra-ui/react";
import { BiSkipPrevious, BiSkipNext, BiPlay } from "react-icons/bi";
import { getModuleDetails } from "../../../services/phonics";
import { useSpeechSynthesis } from "react-speech-kit";
import { useLocation,Link } from "react-router-dom";

export default function Learning() {
  const location = useLocation();
  /* const { module,chapter } = location?.state; */
  const { speak } = useSpeechSynthesis();
  const [learningData, setLearningData] = useState({});
  const [currentWord, setCurrentWord] = useState("");
  const getData = async (ch,md) => {
    const d = (
      await getModuleDetails({
        chapter: ch,
        module: md,
        type: "learning",
      })
    ).data;
    console.log(d);
    setLearningData(d);
  };
  useEffect(() => {
    let ch=location?.state?.chapter;
    let md=location?.state?.module;
    getData(ch,md);
  }, [location]);
  const onPlay = () => {
    speak({ text: learningData?.phoneme });
    const x = learningData?.words;
    x.forEach((val) => {
      speak({ text: `<phoneme alphabet='ipa'>${val}</phoneme>` });
    });
    setCurrentWord("");
  };
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
      <Heading>Basic Phonemes-II</Heading>
      <Card
        align="center"
        marginTop="5%"
        padding="2%"
        boxShadow="xl"
        p="6"
        rounded="lg"
        background="yellow.400"
      >
        <CardHeader>
          <Heading size="4xl" textShadow="2xl">
            {" "}
            {learningData?.grapheme}
          </Heading>
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
        {learningData?.words?.map((val, idx) => (
          <Card
            padding="1% 4%"
            boxShadow="md"
            border="1px"
            borderColor="gray.200"
            key={idx}
            background={currentWord === val ? "yellow.100" : "white"}
          >
            {val}
          </Card>
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
          aria-label="Previous"
          fontSize="3xl"
          borderRadius="100%"
          size="lg"
          icon={<BiSkipPrevious />}
        />
        <IconButton
          variant="outline"
          colorScheme="green"
          aria-label="Play"
          fontSize="4xl"
          boxSize="20"
          rounded="100%"
          icon={<BiPlay />}
          onClick={() => onPlay()}
        />
        <Link to={{
                pathname: "/phonics/assessment",
                state: { chapter: 1, module: 0 },
              }}>
        <IconButton
          variant="outline"
          colorScheme="green"
          aria-label="Next"
          fontSize="3xl"
          borderRadius="100%"
          size="lg"
          icon={<BiSkipNext />}
        /></Link>
      </Flex>
    </Flex>
  );
}
