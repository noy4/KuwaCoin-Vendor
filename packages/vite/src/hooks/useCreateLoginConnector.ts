import { NETWORKS } from '@/constants'
import { useColorMode } from '@chakra-ui/react'
import { StaticJsonRpcProvider } from '@ethersproject/providers'
import WalletConnectProvider from '@walletconnect/ethereum-provider'
import {
  ConnectToStaticJsonRpcProvider,
  EthersModalConnector,
} from 'eth-hooks/context'
import { useCallback } from 'react'
import { ICoreOptions, IProviderOptions } from 'web3modal'

const providerOptions: IProviderOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: import.meta.env.VITE_INFURA_ID,
    },
  },
  'custom-localhost': {
    display: {
      logo: 'https://avatars.githubusercontent.com/u/56928858?s=200&v=4',
      name: 'BurnerWallet',
      description: '🔥 Connect to localhost with a burner wallet 🔥',
    },
    package: StaticJsonRpcProvider,
    connector: ConnectToStaticJsonRpcProvider,
    options: {
      chainId: NETWORKS.localhost.chainId,
      rpc: {
        [NETWORKS.localhost.chainId]: NETWORKS.localhost.url,
      },
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
