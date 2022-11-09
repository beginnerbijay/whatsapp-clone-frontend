import { Flex, Spacer, Button, Image, Center, useColorModeValue } from "@chakra-ui/react";
import React,{useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Usercontext from '../context'

function Profile() {
  const {user} = useContext(Usercontext)
  const [show, setshow] = useState(true)
  const nav = useNavigate()
  
  useEffect(() => {
    if(user.avatar==undefined){
      setshow(false)
    }else{
      setshow(true)
    }
    if(!show){
      nav("/")
    }
    
  }, [show])
  
  
 
    const bg = useColorModeValue('#ededed', '#202c33')
  return (
    <Flex px="3" py="2" bg={bg} className='profile'>
      <Center>
        <Image
          borderRadius="full"
          boxSize="42px"
          className="image"
          src={`data:image/svg+xml;base64,${user.avatar}`}
        />
      </Center>
      <Spacer />
      <Center>
        <Button colorScheme='whatsapp' size="md" height="32px" width="68px" px="2" onClick={()=>nav('/')}>
          Log Out
        </Button>
      </Center>
    </Flex>
  );
}

export default Profile;
