import { Box, Button, HStack, useColorMode } from '@chakra-ui/react'
import { useEthersAppContext } from 'eth-hooks/context'
import { useEffect, useRef } from 'react'
import { useCreateLoginConnector } from './hooks'

function App() {
  const ethersAppContext = useEthersAppContext()
  const { toggleColorMode } = useColorMode()
  const createLoginConnector = useCreateLoginConnector()

  const connect = () => {
    const connector = createLoginConnector()
    ethersAppContext.openModal(connector)
  }

  const disconnect = () => {
    if (ethersAppContext.active) {
      ethersAppContext.disconnectModal()
    }
  }

  const isMounted = useRef(false)

  useEffect(() => {
    if (!ethersAppContext.active && !isMounted.current) {
      let connector = createLoginConnector()
      connector.loadWeb3Modal()
      if (!connector.hasCachedProvider()) {
        connector = createLoginConnector('custom-localhost')
      }
      ethersAppContext.activate(connector)
    }
  }, [createLoginConnector])

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true
    }
  }, [])

  return (
    <>
      <HStack m='8'>
        <Button onClick={toggleColorMode}>Toggle</Button>
        <Button onClick={connect}>Connect</Button>
        <Button onClick={disconnect}>Dissconect</Button>
        <Box>{ethersAppContext.account}</Box>
      </HStack>
    </>
  )
}

export default App
