import React, { useContext, useEffect, useRef, useState } from "react";
import { Box, Button, Center, Flex, Image, Spacer, Spinner, useColorModeValue } from "@chakra-ui/react";
import Chatinput from "./Chatinput";
import UserContext from "../context";
import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { ArrowBackIcon } from "@chakra-ui/icons";
import {host} from '../util'

function Chat() {
  const { currentChat, user, setCurrentChat } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  const socket = useRef();
  const bg = useColorModeValue("#dcd3cc", "#0b131a");
  const hbg = useColorModeValue("#ededed", "#202c33");
  const sbg = useColorModeValue("#dcf8c6", "#014037");
  const rbg = useColorModeValue("#fff", "#232f36");
  const color = useColorModeValue("#000", "#fff");
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post(`${host}/getmsg`, {
        from: user._id,
        to: currentChat._id,
      });
      setMessages(response.data);
    };
    fetchData();
  }, [currentChat]);
  const handlesendmsg = async (msg) => {
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: user._id,
      msg,
    });
    await axios.post(`${host}/addmsg`, {
      from: user._id,
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };
  useEffect(() => {
    if (user) {
      socket.current = io(`${host}`);
      socket.current.emit("add-user", user._id);
    }
  }, [user]);
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);
  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box
      className="chat"
      bg={bg}
      display={{ base: currentChat ? "flex" : "none", md: "flex" }}
    >
      {currentChat ? (
        <Flex bg={hbg} p="2">
          <Image
            src={`data:image/svg+xml;base64,${currentChat.avatar}`}
            borderRadius="full"
            boxSize="42px"
            me="2"
          />
          <Center>
            <Box>{currentChat.name}</Box>
          </Center>
          <Spacer/>
          <Button  display={{base:"",md:"none"}} onClick={() => setCurrentChat(false)}><ArrowBackIcon /></Button>
        </Flex>
      ) : (
        <div></div>
      )}
      <Box className="chat-messages">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <Box className="content " bg={message.fromSelf ? sbg : rbg}>
                  <Box color={color}>{message.message}</Box>
                </Box>
              </div>
            </div>
          );
        })}
      </Box>
      <Chatinput handlesendmsg={handlesendmsg} />
    </Box>
  );
}

export default Chat;
