import React, { useState } from 'react';
import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuDivider,
  MenuOptionGroup,
  MenuItemOption,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Button,
} from '@chakra-ui/react';
import { GoSettings } from 'react-icons/go';

function VoiceOptions({ togglePlay, synthesizeSpeech, handleAudioRemoval }) {
  const [speakingRate, setSpeakingRate] = useState(1);
  const [voiceGender, setVoiceGender] = useState('female');

  const handleVoiceChanges = onClose => {
    onClose();
    handleAudioRemoval(false);
    synthesizeSpeech(speakingRate, voiceGender);
    togglePlay();
  };

  return (
    <Menu closeOnSelect={false}>
      {({ onClose }) => (
        <>
          <MenuButton
            ml={4}
            size='lg'
            as={IconButton}
            icon={<GoSettings size='30px' />}
            variant='ghost'
          />
          <MenuList
            p={4}
            zIndex='999'
            minWidth={{ base: '240px', md: '300px' }}>
            <MenuGroup title='Voice Speed'>
              <Slider
                aria-label='Voice speed'
                colorScheme='twitter'
                defaultValue={1}
                min={0.25}
                max={2}
                step={0.25}
                value={speakingRate}
                onChange={sr => setSpeakingRate(sr)}>
                <SliderMark value={0.25} mt='2' fontSize='xs'>
                  0.25
                </SliderMark>
                <SliderMark value={1} mt='2' fontSize='xs'>
                  1
                </SliderMark>
                <SliderMark value={2} mt='2' fontSize='xs'>
                  2
                </SliderMark>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </MenuGroup>
            <MenuDivider my={6} />
            <MenuOptionGroup
              defaultValue='female'
              title='Voice Selection'
              type='radio'
              value={voiceGender}
              onChange={vg => setVoiceGender(vg)}>
              <MenuItemOption value='female'>Female</MenuItemOption>
              <MenuItemOption value='male'>Male</MenuItemOption>
            </MenuOptionGroup>
            <Button
              mt={4}
              size='sm'
              colorScheme='twitter'
              onClick={() => handleVoiceChanges(onClose)}>
              Save
            </Button>
          </MenuList>
        </>
      )}
    </Menu>
  );
}

export default VoiceOptions;
