import {Box, Flex,useColorModeValue } from '@chakra-ui/react'
import React, { useContext } from 'react'
import UserContext from '../context'
import ChatList from './ChatList'
import Profile from './Profile'

function SiderBar() {
  const {currentChat} = useContext(UserContext)
    const bg = useColorModeValue('#fff', '#101d24')
  return (
    <Box  className='sidebar' bg={bg} display={{base:currentChat?"none":"flex",md:"flex" }}>
    <ChatList />
    <Profile/>
    </Box>
  )
}

export default SiderBar