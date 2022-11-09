import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter} from 'react-router-dom'
import { ColorModeScript } from '@chakra-ui/react'
import theme from './theme'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <ChakraProvider>
  <BrowserRouter>
  <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
  </BrowserRouter>
  </ChakraProvider>
  </React.StrictMode>
)
