import BigNumber from 'bignumber.js'
import { usePayflowBusdPrice } from 'hooks/useBUSDPrice'
import { useMemo } from 'react'

export const usePricePayflowBusd = (): BigNumber => {
  const price = usePayflowBusdPrice()

  const priceBusd = useMemo(() => {
    return price ? new BigNumber(price.toFixed()) : new BigNumber(0)
  }, [price])

  return priceBusd

  // const state = store.getState()

  // const busdPrice = useBUSDPrice()
  // const farm = state.pools.farmdata
  //   .find(p => p.quoteToken.address === '')

  // const cakePriceBusd = useMemo(() => {
  //   return new BigNumber(cakePriceBusdAsString)
  // }, [farms])

  // return cakePriceBusd
}
