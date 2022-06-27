import { Box, Button, HStack, useColorMode } from '@chakra-ui/react'
import { useEthersAppContext } from 'eth-hooks/context'
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
