import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import ReactDOM from 'react-dom/client'
import temaCustomizado from './assets/styles/tema.ts'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={temaCustomizado}>
    <App />
    </ChakraProvider>
  </React.StrictMode>,
)