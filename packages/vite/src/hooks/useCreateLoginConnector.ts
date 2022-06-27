import { useColorMode } from '@chakra-ui/react'
import WalletConnectProvider from '@walletconnect/ethereum-provider'
import { EthersModalConnector } from 'eth-hooks/context'
import { useCallback } from 'react'
import { ICoreOptions, IProviderOptions } from 'web3modal'

const providerOptions: IProviderOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: import.meta.env.VITE_INFURA_ID,
    },
  },
}

const web3ModalConfig: Partial<ICoreOptions> = {
  cacheProvider: true,
  providerOptions,
}

export const useCreateLoginConnector = () => {
  const { colorMode } = useColorMode()

  const createLoginConnector = useCallback(
    (id?: string) => {
      const connector = new EthersModalConnector(
        { ...web3ModalConfig, theme: colorMode },
        { reloadOnNetworkChange: false, immutableProvider: false },
        id
      )
      return connector
    },
    [colorMode]
  )

  return createLoginConnector
}
