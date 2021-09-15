import { Web3Provider } from '@ethersproject/providers'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { BscConnector } from '@binance-chain/bsc-connector'
import { NETWORK_URL, REACT_APP_CHAIN_ID } from '../../utils/c'
import { NetworkConnector } from './NetworkConnector'

export const NETWORK_CHAIN_ID = parseInt(REACT_APP_CHAIN_ID ?? "56")

if (typeof NETWORK_URL === 'undefined') {
  throw new Error(`Please provide blockchain readonly url`)
}

export const network = new NetworkConnector({
  urls: { 
    [NETWORK_CHAIN_ID]: NETWORK_URL 
  },
})

let networkLibrary
export function getNetworkLibrary() {
  if(!networkLibrary) {
    networkLibrary = new Web3Provider(network.provider)
    networkLibrary.pollingInterval = 15000
  }
  return networkLibrary
}

export function getLibrary(provider) {
  const library = new Web3Provider(provider)
  library.pollingInterval = 15000
  return library
}

export const injected = new InjectedConnector({
  supportedChainIds: [56, 97],
})

export const bscConnector = new BscConnector({ supportedChainIds: [56] })

// mainnet only
export const walletconnect = new WalletConnectConnector({
  rpc: { [NETWORK_CHAIN_ID]: NETWORK_URL },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: 15000,
})

// mainnet only
export const walletlink = new WalletLinkConnector({
  url: NETWORK_URL,
  appName: 'Uniswap',
  appLogoUrl:
    'https://mpng.pngfly.com/20181202/bex/kisspng-emoji-domain-unicorn-pin-badges-sticker-unicorn-tumblr-emoji-unicorn-iphoneemoji-5c046729264a77.5671679315437924251569.jpg',
})

export const connectorsByName = {
  network: network,
  injected: injected,
  walletConnect: walletconnect,
  bsc: bscConnector,
}