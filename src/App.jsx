import React,{useState} from 'react'
import{Route,Routes} from 'react-router-dom'
import Auth from './Pages/Auth'
import Home from './Pages/Home'
import UserContext from './context'

function App() {
  const [user, setuser] = useState({})
  const [currentChat, setCurrentChat] = useState(undefined)
  const [msgs, setmsgs] = useState('')
  const changeChat = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <UserContext.Provider value={{user,setuser,currentChat,setCurrentChat,changeChat,msgs,setmsgs}}>
    <Routes>
      <Route exact path='/:id' element={<Home/>} />
      <Route exact path='/' element={<Auth/>} />
    </Routes>
    </UserContext.Provider>
  )
}

export default App