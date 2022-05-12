import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import BigNumber from 'bignumber.js'
import poolsConfig from 'config/constants/pools'
import { AppThunk, PoolsState, SerializedFarm, SerializedPool } from 'state/types'
import { getPoolApr } from 'utils/apr'
import { BIG_ZERO } from 'utils/bigNumber'
import { getBalanceNumber } from 'utils/formatBalance'
import { simpleRpcProvider } from 'utils/providers'
import priceHelperLpsConfig from 'config/constants/priceHelperLps'
import fetchFarms from 'state/farms/fetchFarms'
import getFarmsPrices from 'state/farms/getFarmsPrices'
import {
  fetchPoolsBlockLimits,
  fetchPoolsProfileRequirement,
  fetchPoolsStakingLimits,
  fetchPoolsTotalStaking,
} from './fetchPools'
import {
  fetchPoolsAllowance,
  fetchUserBalances,
  fetchUserPendingRewards,
  fetchUserStakeBalances,
} from './fetchPoolsUser'
import { getTokenPricesFromFarm } from './helpers'
import { resetUserState } from '../global/actions'

const initialState: PoolsState = {
  data: [...poolsConfig],
  userDataLoaded: false,
}

export const fetchPoolsPublicDataAsync = (currentBlockNumber: number) => async (dispatch, getState) => {
  try {
    const [blockLimits, totalStakings, profileRequirements] = await Promise.all([
      fetchPoolsBlockLimits(),
      fetchPoolsTotalStaking(),
      fetchPoolsProfileRequirement(),
    ])
    let currentBlock = currentBlockNumber
    if (!currentBlock) {
      currentBlock = await simpleRpcProvider.getBlockNumber()
    }

    const activePriceHelperLpsConfig = priceHelperLpsConfig.filter((priceHelperLpConfig) => {
      return (
        poolsConfig
          .filter((pool) => pool.earningToken.address.toLowerCase() === priceHelperLpConfig.token.address.toLowerCase())
          .filter((pool) => {
            const poolBlockLimit = blockLimits.find((blockLimit) => blockLimit.sousId === pool.sousId)
            if (poolBlockLimit) {
              return poolBlockLimit.endBlock > currentBlock
            }
            return false
          }).length > 0
      )
    })
    const poolsWithDifferentFarmToken =
      activePriceHelperLpsConfig.length > 0 ? await fetchFarms(priceHelperLpsConfig) : []

    // dispatch(setFarmsPublicData(poolsWithDifferentFarmToken.map(farm => ({
    //   ...farm,
    // }))))

    const farmsData = poolsWithDifferentFarmToken // getState().farms.data
    const bnbBusdFarm =
      activePriceHelperLpsConfig.length > 0
        ? farmsData.find((farm) => farm.token.symbol === 'BUSD' && farm.quoteToken.symbol === 'WBNB')
        : null
    const farmsWithPricesOfDifferentTokenPools = bnbBusdFarm
      ? getFarmsPrices([bnbBusdFarm, ...poolsWithDifferentFarmToken])
      : []

    const prices = getTokenPricesFromFarm([...farmsData, ...farmsWithPricesOfDifferentTokenPools])

    const liveData = poolsConfig.map((pool) => {
      const blockLimit = blockLimits.find((entry) => entry.sousId === pool.sousId)
      const totalStaking = totalStakings.find((entry) => entry.sousId === pool.sousId)
      const isPoolEndBlockExceeded = currentBlock > 0 && blockLimit ? currentBlock > Number(blockLimit.endBlock) : false
      const isPoolFinished = pool.isFinished || isPoolEndBlockExceeded

      const stakingTokenAddress = pool.stakingToken.address ? pool.stakingToken.address.toLowerCase() : null
      const stakingTokenPrice = stakingTokenAddress ? prices[stakingTokenAddress] : 0

      const earningTokenAddress = pool.earningToken.address ? pool.earningToken.address.toLowerCase() : null
      const earningTokenPrice = earningTokenAddress ? prices[earningTokenAddress] : 0
      const apr = !isPoolFinished
        ? getPoolApr(
            stakingTokenPrice,
            earningTokenPrice,
            getBalanceNumber(new BigNumber(totalStaking.totalStaked), pool.stakingToken.decimals),
            parseFloat(pool.tokenPerBlock),
          )
        : 0

      const profileRequirement = profileRequirements[pool.sousId] ? profileRequirements[pool.sousId] : undefined

      return {
        ...blockLimit,
        ...totalStaking,
        profileRequirement,
        stakingTokenPrice,
        earningTokenPrice,
        apr,
        isFinished: isPoolFinished,
      }
    })

    dispatch(setPoolsPublicData(liveData))
  } catch (error) {
    console.error('[Pools Action] error when getting public data', error)
  }
}

export const fetchPoolsStakingLimitsAsync = () => async (dispatch, getState) => {
  const poolsWithStakingLimit = getState()
    .pools.data.filter(({ stakingLimit }) => stakingLimit !== null && stakingLimit !== undefined)
    .map((pool) => pool.sousId)

  try {
    const stakingLimits = await fetchPoolsStakingLimits(poolsWithStakingLimit)

    const stakingLimitData = poolsConfig.map((pool) => {
      if (poolsWithStakingLimit.includes(pool.sousId)) {
        return { sousId: pool.sousId }
      }
      const { stakingLimit, numberBlocksForUserLimit } = stakingLimits[pool.sousId] || {
        stakingLimit: BIG_ZERO,
        numberBlocksForUserLimit: 0,
      }
      return {
        sousId: pool.sousId,
        stakingLimit: stakingLimit.toJSON(),
        numberBlocksForUserLimit,
      }
    })

    dispatch(setPoolsPublicData(stakingLimitData))
  } catch (error) {
    console.error('[Pools Action] error when getting staking limits', error)
  }
}

export const fetchPoolsUserDataAsync =
  (account: string): AppThunk =>
  async (dispatch) => {
    try {
      const [allowances, stakingTokenBalances, stakedBalances, pendingRewards] = await Promise.all([
        fetchPoolsAllowance(account),
        fetchUserBalances(account),
        fetchUserStakeBalances(account),
        fetchUserPendingRewards(account),
      ])

      const userData = poolsConfig.map((pool) => ({
        sousId: pool.sousId,
        allowance: allowances[pool.sousId],
        stakingTokenBalance: stakingTokenBalances[pool.sousId],
        stakedBalance: stakedBalances[pool.sousId],
        pendingReward: pendingRewards[pool.sousId],
      }))

      dispatch(setPoolsUserData(userData))
    } catch (error) {
      console.error('[Pools Action] Error fetching pool user data', error)
    }
  }

export const updateUserAllowance =
  (sousId: number, account: string): AppThunk =>
  async (dispatch) => {
    const allowances = await fetchPoolsAllowance(account)
    dispatch(updatePoolsUserData({ sousId, field: 'allowance', value: allowances[sousId] }))
  }

export const updateUserBalance =
  (sousId: number, account: string): AppThunk =>
  async (dispatch) => {
    const tokenBalances = await fetchUserBalances(account)
    dispatch(updatePoolsUserData({ sousId, field: 'stakingTokenBalance', value: tokenBalances[sousId] }))
  }

export const updateUserStakedBalance =
  (sousId: number, account: string): AppThunk =>
  async (dispatch) => {
    const stakedBalances = await fetchUserStakeBalances(account)
    dispatch(updatePoolsUserData({ sousId, field: 'stakedBalance', value: stakedBalances[sousId] }))
  }

export const updateUserPendingReward =
  (sousId: number, account: string): AppThunk =>
  async (dispatch) => {
    const pendingRewards = await fetchUserPendingRewards(account)
    dispatch(updatePoolsUserData({ sousId, field: 'pendingReward', value: pendingRewards[sousId] }))
  }

export const PoolsSlice = createSlice({
  name: 'Pools',
  initialState,
  reducers: {
    setPoolPublicData: (state, action) => {
      const { sousId } = action.payload
      const poolIndex = state.data.findIndex((pool) => pool.sousId === sousId)
      state.data[poolIndex] = {
        ...state.data[poolIndex],
        ...action.payload.data,
      }
    },
    setPoolUserData: (state, action) => {
      const { sousId } = action.payload
      const poolIndex = state.data.findIndex((pool) => pool.sousId === sousId)
      state.data[poolIndex].userData = action.payload.data
    },
    setPoolsPublicData: (state, action) => {
      const livePoolsData: SerializedPool[] = action.payload
      state.data = state.data.map((pool) => {
        const livePoolData = livePoolsData.find((entry) => entry.sousId === pool.sousId)
        return { ...pool, ...livePoolData }
      })
    },
    setPoolsUserData: (state, action) => {
      const userData = action.payload
      state.data = state.data.map((pool) => {
        const userPoolData = userData.find((entry) => entry.sousId === pool.sousId)
        return { ...pool, userData: userPoolData }
      })
      state.userDataLoaded = true
    },
    updatePoolsUserData: (state, action) => {
      const { field, value, sousId } = action.payload
      const index = state.data.findIndex((p) => p.sousId === sousId)

      if (index >= 0) {
        state.data[index] = { ...state.data[index], userData: { ...state.data[index].userData, [field]: value } }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetUserState, (state) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state.data = state.data.map(({ userData, ...pool }) => {
        return { ...pool }
      })
      state.userDataLoaded = false
    })
  },
})

// Actions
export const { setPoolsPublicData, setPoolsUserData, updatePoolsUserData, setPoolPublicData, setPoolUserData } =
  PoolsSlice.actions

export default PoolsSlice.reducer
