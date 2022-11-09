import { Center, Flex, Input, useColorModeValue} from "@chakra-ui/react";
import React,{useState} from "react";
import { IoMdSend } from "react-icons/io";
import { VscSmiley } from "react-icons/vsc";

function Chatinput({handlesendmsg}) {
  const [msg, setmsg] = useState('')
  const bg = useColorModeValue('#ededed','#1a202c')
  const ibg = useColorModeValue('#fff','#0b131a')
  const sendmsg=(e)=>{
    e.preventDefault()
    if(msg.length > 0)
    {
      handlesendmsg(msg)
      setmsg("")
    }
  }
  return (
    <Flex className="chatinput" bg={bg}>
      <Center>
        <VscSmiley size="1.7rem" className="emoji"/>
      </Center>
      <Input
        borderRadius="5px"
        placeholder="search here"
        className="msginput"
        value={msg}
        onChange={(e) => setmsg(e.target.value)}
        bg={ibg}
      />
      <Center>
        <IoMdSend className="sendicon" size="2.4rem" type="submit" onClick={(e)=>sendmsg(e)}/>
      </Center>
    </Flex>
  );
}

export default Chatinput;
