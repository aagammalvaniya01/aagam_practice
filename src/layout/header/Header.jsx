import React from 'react';
import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';

const LIGHT = 'light.header';
const DARK = 'dark.header';

export const HEADER_BG = {
  LIGHT: `${LIGHT}.bgColor`,
  DARK:`${DARK}.bgColor`,
};

const Header = () => {
  const bgHeader = useColorModeValue(HEADER_BG.LIGHT, HEADER_BG.DARK);
  return (
    <Box p={4} bg={bgHeader} color="white">
      <Flex justify="flex-end" align="center">
        <ColorModeSwitcher />
      </Flex>
    </Box>
  );
};

export default Header;
