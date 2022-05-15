import { useMemo } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import {
  getBep20Contract,
  getErc721Contract,
  getChainlinkOracleContract,
  getErc721CollectionContract,
  getPayflowContract,
  getSouschefContract,
} from 'utils/contractHelpers'
import { getMulticallAddress } from 'utils/addressHelpers'
import { Erc20, Erc20Bytes32, Multicall, Weth, Cake, Erc721collection, CakeVaultV2 } from 'config/abi/types'

// Imports below migrated from Exchange useContract.ts
import { Contract } from '@ethersproject/contracts'
import { WETH } from '@pancakeswap/sdk'
import IPancakePairABI from '../config/abi/IPancakePair.json'
import { ERC20_BYTES32_ABI } from '../config/abi/erc20'
import ERC20_ABI from '../config/abi/erc20.json'
import WETH_ABI from '../config/abi/weth.json'
import multiCallAbi from '../config/abi/Multicall.json'
import { getContract, getProviderOrSigner } from '../utils'

import { IPancakePair } from '../config/abi/types/IPancakePair'

/**
 * Helper hooks to get specific contracts (by ABI)
 */

export const useERC20 = (address: string, withSignerIfPossible = true) => {
  const { library, account } = useActiveWeb3React()
  const signer = useMemo(
    () => (withSignerIfPossible ? getProviderOrSigner(library, account) : null),
    [withSignerIfPossible, library, account],
  )
  return useMemo(() => getBep20Contract(address, signer), [address, signer])
}

/**
 * @see https://docs.openzeppelin.com/contracts/3.x/api/token/erc721
 */
export const useERC721 = (address: string, withSignerIfPossible = true) => {
  const { account, library } = useActiveWeb3React()
  const signer = useMemo(
    () => (withSignerIfPossible ? getProviderOrSigner(library, account) : null),
    [withSignerIfPossible, library, account],
  )
  return useMemo(() => getErc721Contract(address, signer), [address, signer])
}

export const usePayflow = (): { reader: Erc20; signer: Erc20 } => {
  const { account, library } = useActiveWeb3React()
  return useMemo(
    () => ({
      reader: getPayflowContract(null),
      signer: getPayflowContract(getProviderOrSigner(library, account)),
    }),
    [account, library],
  )
}

export const useSousChef = (id) => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getSouschefContract(id, library.getSigner()), [id, library])
}

export const useChainlinkOracleContract = (withSignerIfPossible = true) => {
  const { library, account } = useActiveWeb3React()
  const signer = useMemo(
    () => (withSignerIfPossible ? getProviderOrSigner(library, account) : null),
    [withSignerIfPossible, library, account],
  )
  return useMemo(() => getChainlinkOracleContract(signer), [signer])
}

export const useErc721CollectionContract = (
  collectionAddress: string,
): { reader: Erc721collection; signer: Erc721collection } => {
  const { library, account } = useActiveWeb3React()
  return useMemo(
    () => ({
      reader: getErc721CollectionContract(null, collectionAddress),
      signer: getErc721CollectionContract(getProviderOrSigner(library, account), collectionAddress),
    }),
    [account, library, collectionAddress],
  )
}

// Code below migrated from Exchange useContract.ts

// returns null on errors
function useContract<T extends Contract = Contract>(
  address: string | undefined,
  ABI: any,
  withSignerIfPossible = true,
): T | null {
  const { library, account } = useActiveWeb3React()
  const signer = useMemo(
    () => (withSignerIfPossible ? getProviderOrSigner(library, account) : null),
    [withSignerIfPossible, library, account],
  )

  const canReturnContract = useMemo(
    () => address && ABI && (withSignerIfPossible ? library : true),
    [address, ABI, library, withSignerIfPossible],
  )

  return useMemo(() => {
    if (!canReturnContract) return null
    try {
      return getContract(address, ABI, signer)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI, signer, canReturnContract]) as T
}

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean) {
  return useContract<Erc20>(tokenAddress, ERC20_ABI, withSignerIfPossible)
}

export function useWBNBContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract<Weth>(chainId ? WETH[chainId].address : undefined, WETH_ABI, withSignerIfPossible)
}

export function useBytes32TokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract<Erc20Bytes32>(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible)
}

export function usePairContract(pairAddress?: string, withSignerIfPossible?: boolean): IPancakePair | null {
  return useContract(pairAddress, IPancakePairABI, withSignerIfPossible)
}

export function useMulticallContract() {
  return useContract<Multicall>(getMulticallAddress(), multiCallAbi, false)
}
