import { useEffect, useMemo } from 'react'
import { useWeb3React } from '@web3-react/core'
import { batch, useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import { useFastRefreshEffect, useSlowRefreshEffect } from 'hooks/useRefreshEffect'
import { fetchPoolsPublicDataAsync, fetchPoolsUserDataAsync, fetchPoolsStakingLimitsAsync } from '.'
import { DeserializedPool } from '../types'
import { poolsWithUserDataLoadingSelector, makePoolWithUserDataLoadingSelector } from './selectors'

export const useFetchPublicPoolsData = () => {
  const dispatch = useAppDispatch()

  useSlowRefreshEffect(
    (currentBlock) => {
      const fetchPoolsData = async () => {
        batch(() => {
          dispatch(fetchPoolsPublicDataAsync(currentBlock))
          dispatch(fetchPoolsStakingLimitsAsync())
        })
      }

      fetchPoolsData()
    },
    [dispatch],
  )
}

export const useFetchUserPools = (account) => {
  const dispatch = useAppDispatch()

  useFastRefreshEffect(() => {
    if (account) {
      dispatch(fetchPoolsUserDataAsync(account))
    }
  }, [account, dispatch])
}

export const usePools = (): { pools: DeserializedPool[]; userDataLoaded: boolean } => {
  return useSelector(poolsWithUserDataLoadingSelector)
}

export const usePool = (sousId: number): { pool: DeserializedPool; userDataLoaded: boolean } => {
  const poolWithUserDataLoadingSelector = useMemo(() => makePoolWithUserDataLoadingSelector(sousId), [sousId])
  return useSelector(poolWithUserDataLoadingSelector)
}

export const usePoolsPageFetch = () => {
  const { account } = useWeb3React()
  const dispatch = useAppDispatch()
  useFetchPublicPoolsData()

  useFastRefreshEffect(() => {
    batch(() => {
      if (account) {
        dispatch(fetchPoolsUserDataAsync(account))
      }
    })
  }, [account, dispatch])
}
