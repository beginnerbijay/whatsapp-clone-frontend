import { Flex,Center,Spacer,Image,Box, useColorModeValue, Input} from '@chakra-ui/react'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import UserContext from '../context'
import {host} from '../util'
import {BiFilter} from 'react-icons/bi'

function ChatList() {
  const {changeChat} = useContext(UserContext)
  const {id} = useParams()
  const [user, setuser] = useState([])
  const [val, setval] = useState('')
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const bg = useColorModeValue('#f0f2f5', '#2a3942')
  const sbg = useColorModeValue('#ededed', '#202c33')
  const ibg = useColorModeValue('#fff','#101d24') 
  const changecaht=(index,contact)=>{
    setCurrentSelected(index);
    changeChat(contact);
    console.log(contact)
  }
  const search=()=>{
    return (
      user.filter(
        (users)=>users.name.toUpperCase().includes(val) ||
        users.name.toLowerCase().includes(val) 
      )
    )
  }
  useEffect(()=>{
    const fetchdata=async()=>{
      const {data} = await axios.get(`${host}/${id}`)
      setuser(data)
    }
    fetchdata()
  },[])
  return (
    <><Flex bg={sbg} py='2' px='1.5'>
    <Input borderRadius='full' placeholder='search here' bg={ibg} className='search' value={val} onChange={(e)=>setval(e.target.value)}/>
    <Spacer/>
    <Center>
    <BiFilter size='1.5rem'/>
    </Center>
</Flex>
<Flex className='list'>
      {
        search().map((val,ind)=>{
          return(
            <Flex key={ind} py='2' px='3' className={`chatlist ${
                    ind === currentSelected ? "selected" : ""
                  }`} onClick={()=>changecaht(ind,val)} bg={ind === currentSelected ?bg:""}>
              <Center>
          <Image
            borderRadius="full"
            boxSize="48px"
            src={`data:image/svg+xml;base64,${val.avatar}`}
            me='3'
          />
        </Center>
        <Center>
          <Box>{val.name}</Box>
        </Center>
            </Flex>
          )
        })
      }
      </Flex>
    </>
  )
}

export default ChatList