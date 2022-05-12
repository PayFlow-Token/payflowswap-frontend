import { Box, Flex, Skeleton, Text, useMatchBreakpoints } from '@payflowswap/uikit'
import BigNumber from 'bignumber.js'
import Balance from 'components/Balance'
import { useTranslation } from 'contexts/Localization'

import { DeserializedPool } from 'state/types'
import styled from 'styled-components'
import { BIG_ZERO } from 'utils/bigNumber'
import { getBalanceNumber } from 'utils/formatBalance'
import BaseCell, { CellContent } from './BaseCell'

interface StakedCellProps {
  pool: DeserializedPool
  account: string
  userDataLoaded: boolean
}

const StyledCell = styled(BaseCell)``

const StakedCell: React.FC<StakedCellProps> = ({ pool, account, userDataLoaded }) => {
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()

  // pool
  const { stakingTokenPrice, stakingToken, userData } = pool
  const stakedBalance = userData?.stakedBalance ? new BigNumber(userData.stakedBalance) : BIG_ZERO
  const stakedTokenBalance = getBalanceNumber(stakedBalance, stakingToken.decimals)
  const stakedTokenDollarBalance = getBalanceNumber(
    stakedBalance.multipliedBy(stakingTokenPrice),
    stakingToken.decimals,
  )

  const labelText = `${pool.stakingToken.symbol} ${t('Staked')}`

  const hasStaked = account && stakedBalance.gt(0)

  const userDataLoading = !userDataLoaded

  return (
    <StyledCell role="cell" flex={'2 0 100px'}>
      <CellContent>
        <Text fontSize="12px" color="textSubtle" textAlign="left">
          {labelText}
        </Text>
        {userDataLoading && account ? (
          <Skeleton width="80px" height="16px" />
        ) : (
          <>
            <Flex>
              <Box mr="8px" height="32px">
                <Balance
                  mt="4px"
                  bold={!isMobile}
                  fontSize={isMobile ? '14px' : '16px'}
                  color={hasStaked ? 'primary' : 'textDisabled'}
                  decimals={hasStaked ? 5 : 1}
                  value={hasStaked ? stakedTokenBalance : 0}
                />
                {hasStaked ? (
                  <Balance
                    display="inline"
                    fontSize="12px"
                    color="textSubtle"
                    decimals={2}
                    prefix="~"
                    value={stakedTokenDollarBalance}
                    unit=" USD"
                  />
                ) : (
                  <Text mt="4px" fontSize="12px" color="textDisabled">
                    0 USD
                  </Text>
                )}
              </Box>
            </Flex>
          </>
        )}
      </CellContent>
    </StyledCell>
  )
}

export default StakedCell
