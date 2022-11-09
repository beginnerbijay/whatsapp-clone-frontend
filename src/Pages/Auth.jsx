import { useState } from 'react'
import { Container } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel} from '@chakra-ui/react'
import LogIn from '../components/LogIn'
import SignIn from '../components/SignIn'
import Navbar from '../components/Navbar'

function Auth() {
  return (
    <>
  <Navbar />
  <Container mt='2em'>
   <Tabs isFitted variant='unstyled'>
  <TabList mb='1em'>
    <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Log In</Tab>
    <Tab _selected={{ color: 'white', bg: 'green.400' }}>Sign In</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <LogIn/>
    </TabPanel>
    <TabPanel>
      <SignIn/>
    </TabPanel>
  </TabPanels>
</Tabs>
   </Container></>
   
  )
}

export default Auth
