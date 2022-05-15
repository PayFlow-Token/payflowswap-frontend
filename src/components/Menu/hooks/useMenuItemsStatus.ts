import { useMemo } from 'react'

export const useMenuItemsStatus = (): Record<string, string> => {
  // const currentBlock = useCurrentBlock()
  // const activeIfo = useActiveIfoWithBlocks()

  // const ifoStatus =
  //   currentBlock && activeIfo && activeIfo.endBlock > currentBlock
  //     ? getStatus(currentBlock, activeIfo.startBlock, activeIfo.endBlock)
  //     : null

  // return useMemo(() => {
  //   return ifoStatus
  //     ? {
  //         '/ifo': ifoStatus === 'coming_soon' ? 'soon' : ifoStatus,
  //       }
  //     : null
  // }, [ifoStatus])

  const nftStatus = 'coming_soon'

  return useMemo(() => {
    return nftStatus
      ? {
          '/nft': nftStatus === 'coming_soon' ? 'soon' : nftStatus,
        }
      : null
  }, [nftStatus])
}
