import { createSelector } from '@reduxjs/toolkit'
import { State } from '../types'
import { transformPool } from './helpers'

const selectPoolsData = (state: State) => state.pools.data
const selectPoolData = (sousId) => (state: State) => state.pools.data.find((p) => p.sousId === sousId)
const selectUserDataLoaded = (state: State) => state.pools.userDataLoaded

export const makePoolWithUserDataLoadingSelector = (sousId) =>
  createSelector([selectPoolData(sousId), selectUserDataLoaded], (pool, userDataLoaded) => {
    return { pool: transformPool(pool), userDataLoaded }
  })

export const poolsWithUserDataLoadingSelector = createSelector(
  [selectPoolsData, selectUserDataLoaded],
  (pools, userDataLoaded) => {
    return { pools: pools.map(transformPool), userDataLoaded }
  },
)

export const poolsWithVaultSelector = createSelector([poolsWithUserDataLoadingSelector], (poolsWithUserDataLoading) => {
  const { pools, userDataLoaded } = poolsWithUserDataLoading
  const withoutCakePool = pools.filter((pool) => pool.sousId !== 0)

  return { pools: [...withoutCakePool], userDataLoaded }
})
