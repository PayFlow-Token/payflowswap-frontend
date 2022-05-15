import { Token } from '@pancakeswap/sdk'
import Balance from 'components/Balance'
import { Flex, Skeleton, Text, TooltipText, useTooltip } from '@payflowswap/uikit'
import BigNumber from 'bignumber.js'
import { useTranslation } from 'contexts/Localization'
import { FC, ReactNode } from 'react'
import { getBalanceNumber } from 'utils/formatBalance'
import { DeserializedPool } from 'state/types'
import Apr from './Apr'

const StatWrapper: FC<{ label: ReactNode }> = ({ children, label }) => {
  return (
    <Flex mb="2px" justifyContent="space-between" alignItems="center" width="100%">
      {label}
      <Flex alignItems="center">{children}</Flex>
    </Flex>
  )
}

const TotalToken = ({ total, token }: { total: BigNumber; token: Token }) => {
  if (total && total.gte(0)) {
    return <Balance small value={getBalanceNumber(total, token.decimals)} decimals={0} unit={` ${token.symbol}`} />
  }
  return <Skeleton width="90px" height="21px" />
}

export const TotalLocked: FC<{ totalLocked: BigNumber; lockedToken: Token }> = ({ totalLocked, lockedToken }) => {
  const { t } = useTranslation()

  return (
    <StatWrapper label={<Text small>{t('Total locked')}:</Text>}>
      <TotalToken total={totalLocked} token={lockedToken} />
    </StatWrapper>
  )
}

export const TotalStaked: FC<{ totalStaked: BigNumber; stakingToken: Token }> = ({ totalStaked, stakingToken }) => {
  const { t } = useTranslation()

  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    t('Total amount of %symbol% staked in this pool', { symbol: stakingToken.symbol }),
    {
      placement: 'bottom',
    },
  )

  return (
    <StatWrapper
      label={
        <TooltipText ref={targetRef} small>
          {t('Total staked')}:
        </TooltipText>
      }
    >
      {tooltipVisible && tooltip}
      <TotalToken total={totalStaked} token={stakingToken} />
    </StatWrapper>
  )
}

export const AprInfo: FC<{ pool: DeserializedPool; stakedBalance: BigNumber }> = ({ pool, stakedBalance }) => {
  const { t } = useTranslation()
  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Text small>{t('APR')}:</Text>
      <Apr pool={pool} showIcon stakedBalance={stakedBalance} performanceFee={0} fontSize="14px" />
    </Flex>
  )
}
