import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  Button,
  Heading,
  Text,
  Flex,
  Card,
  CardHeader,
  IconButton,
} from "@chakra-ui/react";
import {
  BiPlay,
  BiSkipPrevious,
  BiSkipNext,
  BiVolumeFull,
} from "react-icons/bi";
import { useLocation, Link } from "react-router-dom";
import { useSpeechSynthesis } from "react-speech-kit";
import { getModuleDetails,updateProgress } from "../../../services/phonics";

export default function App() {
  const location = useLocation();
  const [nextLink,setNextLink]=useState({})
  /* const { module,chapter } = location?.state; */
  const { speak, speaking } = useSpeechSynthesis();
  const [assessmentData, setAssessmentData] = useState({});
  const [isAnswered, setIsAnswered] = useState(-1);
  const getData = async (ch, md) => {
    const d = (
      await getModuleDetails({
        chapter: ch,
        module: md,
        type: "assessment",
      })
    ).data;
    console.log(d);
    if(ch==1 && md==0){
      setNextLink({
        pathname: "/phonics/assessment",
        state: { chapter: ch, module: md+1 },
      })
    }
    else{
      setNextLink({
        pathname: "/phonics/learning",
        state: { chapter: ch, module: md+1 },
      })
    }
    console.log(nextLink);
    setAssessmentData(d);

    //update the progress
    const p=await updateProgress({
      module: parseInt(md)
    });
  };
  useEffect(() => {
    let ch = location?.state?.chapter;
    let md = location?.state?.module;
    getData(ch, md);
  }, [location]);
  const onPlay = () => {
    speak({ text: assessmentData?.phoneme });
  };
  const checkAns = (idx) => {
    setIsAnswered(parseInt(idx));
    console.log(idx)
  };
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
        PRACTICE
      </Text>
      <Heading>Basic Phonemes-II</Heading>
      <Text size="sm" marginTop="3">
        Identify the word that contains the spoken phoneme
      </Text>
      <Card
        align="center"
        marginTop="5%"
        padding="2%"
        boxShadow="xl"
        p="6"
        rounded="100"
        backgroundColor={speaking ? "orange.300" : "orange.100"}
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
        {assessmentData?.options?.map((val, idx) => (
          <Button
            padding="5%"
            boxShadow="md"
            border="1px"
            borderColor="gray.200"
            fontSize="3xl"
            key={idx}
            value={idx}
            onClick={(e) => checkAns(e?.target?.value)}
            isDisabled={isAnswered >= 0}
            background={
              isAnswered >= 0
                ? idx === assessmentData?.ans
                  ? "green.100"
                  : idx === isAnswered && idx !== assessmentData?.ans
                  ? "red.100"
                  : "white"
                : "white"
            }
          >
            {val}
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
        <Link to={nextLink} state={nextLink}>
        <IconButton
          variant="outline"
          colorScheme="green"
          aria-label="Next"
          fontSize="3xl"
          borderRadius="100%"
          size="lg"
          icon={<BiSkipNext />}
          onClick={()=>setIsAnswered(-1)}
        />
        </Link>
      </Flex>
    </Flex>
  );
}
