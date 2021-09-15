import { Contract } from '@ethersproject/contracts'
//import { ChainId, WETH } from '@pancakeswap-libs/sdk'
//import { abi as IUniswapV2PairABI } from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import { useMemo } from 'react'
import ENS_ABI from '../abis/ens-registrar.json'
import ENS_PUBLIC_RESOLVER_ABI from '../abis/ens-public-resolver.json'
import { ERC20_BYTES32_ABI } from '../abis/erc20'
import ERC20_ABI from '../abis/erc20.json'
import WETH_ABI from '../abis/weth.json'
//import { MULTICALL_ABI, MULTICALL_NETWORKS } from '../multicall'
import { getContract } from '../utils'
import { useActiveWeb3React } from './index.js'

// returns null on errors
function useContract(address, ABI, withSignerIfPossible = true) {
  const { library, account } = useActiveWeb3React()

  return useMemo(() => {
    if (!address || !ABI || !library) {
      return null
    }
    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI, library, withSignerIfPossible, account])
}

export function useDappContract(tokenAddress, ABI, withSignerIfPossible) {
  return useContract(tokenAddress, ABI, withSignerIfPossible)
}

export function useTokenContract(tokenAddress, withSignerIfPossible) {
  return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible)
}
/*
export function useWETHContract(withSignerIfPossible) {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId ? WETH[chainId].address : undefined, WETH_ABI, withSignerIfPossible)
}*/
/*
export function useENSRegistrarContract(withSignerIfPossible) {
  const { chainId } = useActiveWeb3React()
  let address
  if (chainId) {
    switch (chainId) {
      case ChainId.MAINNET:
      case ChainId.BSCTESTNET:
    }
  }
  return useContract(address, ENS_ABI, withSignerIfPossible)
}*/

export function useENSResolverContract(address, withSignerIfPossible) {
  return useContract(address, ENS_PUBLIC_RESOLVER_ABI, withSignerIfPossible)
}

export function useBytes32TokenContract(tokenAddress, withSignerIfPossible) {
  return useContract(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible)
}
/*
export function usePairContract(pairAddress, withSignerIfPossible) {
  return useContract(pairAddress, IUniswapV2PairABI, withSignerIfPossible)
}*/
/*
export function useMulticallContract() {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId && MULTICALL_NETWORKS[chainId], MULTICALL_ABI, false)
}*/
