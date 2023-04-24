import React, { useState, useEffect, useCallback } from 'react';
import { Box, Highlight, Text } from '@chakra-ui/react';

function ImmersiveReaderText({
  prompt,
  audio,
  playing,
  timePoints,
  timersRef,
  fontSz,
  increaseSpacing,
  font,
  modalBgColor,
}) {
  const [sentenceToHighlight, setSentenceToHighlight] = useState('');
  const [currHighlightedSentenceIndex, setCurrHighlightedSentenceIndex] =
    useState(-1);

  const Timer = function (callback, start, audio) {
    var timerId,
      pausedTime,
      startTime = start;

    this.audio = audio;

    this.pause = function () {
      if (!timerId) return;

      pausedTime = this.audio.currentTime;
      clearTimeout(timerId);
      timerId = null;
    };

    this.resume = function (isFirstTime = true, idx = null, currIdx = null) {
      if (timerId) return;

      if (!isFirstTime && idx > currIdx) {
        startTime -= pausedTime;
        timerId = setTimeout(callback, startTime * 1000);
      } else timerId = setTimeout(callback, startTime * 1000);
    };

    this.resume();
  };

  const highlightSentence = useCallback(
    (timePoint, idx, audio) => {
      const { sentence, startTime } = timePoint;

      const timer = new Timer(
        () => {
          if (prompt.includes(sentence)) {
            setSentenceToHighlight(sentence);
            setCurrHighlightedSentenceIndex(idx);
          }
        },
        startTime,
        audio
      );

      timersRef.current.push(timer);
    },
    [prompt, timersRef]
  );

  useEffect(() => {
    if (playing) {
      if (!timersRef.current.length) {
        timePoints.forEach((timePoint, idx) =>
          highlightSentence(timePoint, idx, audio)
        );
      } else {
        timersRef.current.forEach((timer, idx) =>
          timer.resume(false, idx, currHighlightedSentenceIndex)
        );
      }
    } else {
      timersRef.current.forEach(timer => timer.pause());
      setSentenceToHighlight('');
      setCurrHighlightedSentenceIndex(-1);
    }
  }, [
    playing,
    timePoints,
    timersRef,
    highlightSentence,
    audio,
    currHighlightedSentenceIndex,
  ]);

  return (
    <Box
      flex='1'
      overflow='auto'
      fontFamily={font}
      fontSize={fontSz}
      px={10}
      lineHeight={increaseSpacing ? '260%' : '200%'}
      letterSpacing={increaseSpacing ? '10px' : '2px'}>
      {playing && timePoints.length ? (
        <Text color='gray.400'>
          <Highlight
            query={sentenceToHighlight}
            styles={{
              py: '1',
              bg: '#f7dc6f',
              fontWeight: 'medium',
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
            }}>
            {prompt}
          </Highlight>
        </Text>
      ) : (
        <Text color={modalBgColor === '#111010' ? '#FFFFFF' : ''}>{prompt}</Text>
      )}
    </Box>
  );
}

export default ImmersiveReaderText;
