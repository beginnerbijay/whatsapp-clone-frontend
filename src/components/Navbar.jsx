import React from 'react'
import { Flex, Spacer,Box,Heading, Button, useColorMode, useColorModeValue, } from '@chakra-ui/react'
import {SunIcon,MoonIcon} from '@chakra-ui/icons'

function Navbar() {
    const { colorMode, toggleColorMode } = useColorMode()
    const bg = useColorModeValue('light', 'dark')
  return (
    <Flex minWidth='max-content' alignItems='center' px='10' py='2' boxShadow='xl' rounded='md' bg={bg}>
    <Box p='2'>
      <Heading size='md'>ViChat App</Heading>
    </Box>
    <Spacer />
    <Button onClick={toggleColorMode}>
          {colorMode === 'light' ?  <MoonIcon/> : <SunIcon />}
        </Button>
  </Flex>
  )
}

export default Navbar