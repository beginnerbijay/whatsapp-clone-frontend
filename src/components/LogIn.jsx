import React,{useContext, useState} from 'react'
import {FormControl,FormLabel,Input,Button} from '@chakra-ui/react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import UserContext from '../context'
import {host} from '../util'

function LogIn() {
    const [input, setinput] = useState({
        name:'',
        password:""
    })
    const {setuser,user} = useContext(UserContext)
    const nav = useNavigate()
    const inputhandler=(e)=>{
        const {name,value}= e.target
        setinput({...input,[name]:value})
    }
    const handler=async(e)=>{
      try{
        e.preventDefault();
        const {data} = await axios.post(`${host}/login`,input)
        if(data){
          setuser(data)
          nav(`/${data._id}`)
        }else{
          console.log("backend error")
        }
        }
        catch(e){
          console.log(e)
        }
    }
  return (
    <><FormControl isRequired>
    <FormLabel>Name</FormLabel>
    <Input placeholder='Name' type='text' onChange={inputhandler} value={input.name} name='name'/>
    <FormLabel>Password</FormLabel>
    <Input placeholder='Name' type='password' onChange={inputhandler} value={input.password} name='password'/>
  </FormControl>
<Button
  size='md'
  height='36px'
  width='100%'
  border='2px'
  borderColor='blue.500'
  mt='5'
  colorScheme='blue'
  onClick={handler}
>
  Submit
</Button>
    </>
  )
}

export default LogIn