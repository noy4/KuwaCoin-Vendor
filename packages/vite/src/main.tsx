import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { EthersAppContext } from 'eth-hooks/context'
import { Buffer } from 'buffer'

window.Buffer = window.Buffer || Buffer // otherwise wallet connect modal doesn't work

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <EthersAppContext>
      <ChakraProvider>
        <ColorModeScript />
        <App />
      </ChakraProvider>
    </EthersAppContext>
  </React.StrictMode>
)
