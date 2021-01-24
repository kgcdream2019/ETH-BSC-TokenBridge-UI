import { Box, Flex, HStack, useBreakpointValue } from '@chakra-ui/react';
import React from 'react';
import { Home } from 'react-feather';
import { Link } from 'react-router-dom';

import { DiscordIcon } from '../icons/DiscordIcon';
import { GithubIcon } from '../icons/GithubIcon';
import { TelegramIcon } from '../icons/TelegramIcon';
import { TwitterIcon } from '../icons/TwitterIcon';
import { XDaiIcon } from '../icons/XDaiIcon';

export const Footer = () => {
  const smallScreen = useBreakpointValue({ base: true, sm: false });
  return (
    <Flex
      position="relative"
      justify={{ base: 'center', sm: 'space-between' }}
      align="center"
      h={20}
      px={8}
      w="100%"
      color="rgb(230, 232, 238)"
      background="rgb(30, 32, 38)"
      marginTop="1rem"
    >
      {!smallScreen && (
        <Link to="/" display={{ base: 'none', sm: 'block' }}>
          <Flex
            justify="space-around"
            align="center"
            _hover={{ color: 'blue.500' }}
            transition="0.25s"
          >
            <Home w={6} />
          </Flex>
        </Link>
      )}
      <HStack spacing={4}>
        <Box _hover={{ color: 'blue.500' }}>
          <a
            href="https://justliquidity.org"
            rel="noreferrer noopener"
            target="_blank"
          >
            <XDaiIcon />
          </a>
        </Box>
        <Box _hover={{ color: 'blue.500' }} transition="0.25s">
          <a
            href="https://twitter.com/justliquidity"
            rel="noreferrer noopener"
            target="_blank"
          >
            <TwitterIcon />
          </a>
        </Box>
        <Box _hover={{ color: 'blue.500' }} transition="0.25s">
          <a
            href="https://t.me/justliquidity"
            rel="noreferrer noopener"
            target="_blank"
          >
            <TelegramIcon />
          </a>
        </Box>
        <Box _hover={{ color: 'blue.500' }} transition="0.25s">
          <a
            href="https://discord.gg/dnWmWThbYB"
            rel="noreferrer noopener"
            target="_blank"
          >
            <DiscordIcon />
          </a>
        </Box>

        <Box _hover={{ color: 'blue.500' }} transition="0.25s">
          <a
            href="https://github.com/justliquidity"
            rel="noreferrer noopener"
            target="_blank"
          >
            <GithubIcon />
          </a>
        </Box>

        {/* <Box w="1px" h={5} background="grey" />
        <a
          href="https://raidguild.org"
          rel="noreferrer noopener"
          target="_blank"
        >
          <Flex
            align="center"
            _hover={{ color: 'blue.500' }}
            transition="0.25s"
          >
            <Text>Built by</Text>
            <RaidGuildIcon boxSize={16} ml={2} />
          </Flex>
        </a> */}
      </HStack>
    </Flex>
  );
};
