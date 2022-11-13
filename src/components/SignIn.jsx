import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  useConst,
  Progress,
} from "@chakra-ui/react";
import axios from "axios";
import { Buffer } from "buffer";
import {host} from "../util";

function SignIn() {
  const [input, setinput] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [loading, setloading] = useState(false)
  const btnref = useRef()
  const api = `https://api.multiavatar.com/j3m97UJ5v2pbXP`;
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const nav = useNavigate();
  const inputhandler = (e) => {
    let { name, value } = e.target;
    setinput({ ...input, [name]: value });
  };
  const handler = async (e) => {
    try {
      e.preventDefault();
      if((input.name && input.email && input.phone && input.password) == ""){
        alert("fill required field")
      }else{
      if(btnref.current){
        btnref.current.setAttribute("disabled", "disabled");
      }
      setloading(true)
      const { data } = await axios.post(`${host}/add`, {
        input,
        avatar: avatars[selectedAvatar],
      });
      if (data) {
        setuser(data);
        nav(`/${data._id}`);
      } else {
        console.log("backend error");
      }}
    } catch (e) {
      console.log("error");
    }
  };
  useEffect(() => {
    async function fetchData() {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
    }
    fetchData();
  }, []);
  return (
    <>{loading?<Progress size='xs' isIndeterminate />:""}
      <FormControl isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Name"
          type="text"
          focusBorderColor="green.400"
          onChange={inputhandler}
          value={input.name}
          name="name"
        />
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Email"
          type="email"
          focusBorderColor="green.400"
          onChange={inputhandler}
          value={input.email}
          name="email"
        />
        <FormLabel>Phone</FormLabel>
        <Input
          placeholder="Phone Number"
          type="tel"
          focusBorderColor="green.400"
          onChange={inputhandler}
          value={input.phone}
          name="phone"
        />
        <FormLabel>Password</FormLabel>
        <Input
          placeholder="Name"
          type="password"
          focusBorderColor="green.400"
          onChange={inputhandler}
          value={input.password}
          name="password"
        />
        <FormLabel>Select Avatar</FormLabel>
        <Flex gap={["3", "8"]} width={["22%", "19%"]}>
          {avatars.map((avatar, index) => {
            return (
              <img
                src={`data:image/svg+xml;base64,${avatar}`}
                alt="avatar"
                key={index}
                className="img"
                onClick={() => setSelectedAvatar(index)}
              />
            );
          })}
        </Flex>
      </FormControl>
      <Button
      ref={btnref}
        size="md"
        height="36px"
        width="100%"
        border="2px"
        borderColor="green.400"
        mt="5"
        colorScheme="green"
        onClick={(e) => handler(e)}
      >
        Submit
      </Button>
    </>
  );
}

export default SignIn;
