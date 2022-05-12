import { SerializedFarmConfig } from 'config/constants/types'
import BigNumber from 'bignumber.js'
import { BIG_TEN, BIG_ZERO } from '../../utils/bigNumber'
import { fetchPublicFarmsData } from './fetchPublicFarmData'
import { SerializedFarm } from '../types'

const fetchFarms = async (farmsToFetch: SerializedFarmConfig[]): Promise<SerializedFarm[]> => {
  const [farmResult] = await Promise.all([fetchPublicFarmsData(farmsToFetch)])

  return farmsToFetch.map((farm, index) => {
    const [tokenBalanceLP, quoteTokenBalanceLP, lpTotalSupply, tokenDecimals, quoteTokenDecimals] = farmResult[index]

    // Raw amount of token in the LP, including those not staked
    const tokenAmountTotal = new BigNumber(tokenBalanceLP).div(BIG_TEN.pow(tokenDecimals))
    const quoteTokenAmountTotal = new BigNumber(quoteTokenBalanceLP).div(BIG_TEN.pow(quoteTokenDecimals))

    return {
      ...farm,
      token: farm.token,
      quoteToken: farm.quoteToken,
      tokenAmountTotal: tokenAmountTotal.toJSON(),
      quoteTokenAmountTotal: quoteTokenAmountTotal.toJSON(),
      lpTotalSupply: new BigNumber(lpTotalSupply).toJSON(),
      tokenPriceVsQuote: quoteTokenAmountTotal.div(tokenAmountTotal).toJSON(),
    }
  })
}

export default fetchFarms
