import { Button, Flex, Link, LinkExternal, MetamaskIcon, Skeleton, Text, TimerIcon } from '@payflowswap/uikit'
import Balance from 'components/Balance'
import { BASE_BSC_SCAN_URL } from 'config'
import { useTranslation } from 'contexts/Localization'
import { memo } from 'react'
import { useCurrentBlock } from 'state/block/hooks'
import { DeserializedPool } from 'state/types'
import { getBscScanLink } from 'utils'
import { getAddress } from 'utils/addressHelpers'
import { BIG_ZERO } from 'utils/bigNumber'
import { registerToken } from 'utils/wallet'
import { getPoolBlockInfo } from 'views/Pools/helpers'
import MaxStakeRow from './MaxStakeRow'
import { AprInfo, TotalStaked } from './Stat'

interface ExpandedFooterProps {
  pool: DeserializedPool
  account: string
  showTotalStaked?: boolean
  alignLinksToRight?: boolean
}

const PoolStatsInfo: React.FC<ExpandedFooterProps> = ({
  pool,
  account,
  showTotalStaked = true,
  alignLinksToRight = true,
}) => {
  const { t } = useTranslation()
  const currentBlock = useCurrentBlock()

  const {
    stakingToken,
    earningToken,
    totalStaked,
    startBlock,
    endBlock,
    stakingLimit,
    stakingLimitEndBlock,
    contractAddress,
    profileRequirement,
    isFinished,
    userData: poolUserData,
  } = pool

  const stakedBalance = poolUserData?.stakedBalance ? poolUserData.stakedBalance : BIG_ZERO

  const tokenAddress = earningToken.address || ''
  const poolContractAddress = getAddress(contractAddress)
  const isMetaMaskInScope = !!window.ethereum?.isMetaMask

  const { shouldShowBlockCountdown, blocksUntilStart, blocksRemaining, hasPoolStarted, blocksToDisplay } =
    getPoolBlockInfo(pool, currentBlock)

  return (
    <>
      {profileRequirement && (profileRequirement.required || profileRequirement.thresholdPoints.gt(0)) && (
        <Flex mb="8px" justifyContent="space-between">
          <Text small>{t('Requirement')}:</Text>
          <Text small textAlign="right">
            {profileRequirement.required && t('Pancake Profile')}{' '}
            {profileRequirement.thresholdPoints.gt(0) && (
              <Text small>
                {profileRequirement.thresholdPoints.toNumber().toLocaleString()} {t('Profile Points')}
              </Text>
            )}
          </Text>
        </Flex>
      )}
      <AprInfo pool={pool} stakedBalance={stakedBalance} />
      {showTotalStaked && <TotalStaked totalStaked={totalStaked} stakingToken={stakingToken} />}
      {!isFinished && stakingLimit && stakingLimit.gt(0) && (
        <MaxStakeRow
          small
          currentBlock={currentBlock}
          hasPoolStarted={hasPoolStarted}
          stakingLimit={stakingLimit}
          stakingLimitEndBlock={stakingLimitEndBlock}
          stakingToken={stakingToken}
        />
      )}
      {shouldShowBlockCountdown && (
        <Flex mb="2px" justifyContent="space-between" alignItems="center">
          <Text small>{hasPoolStarted ? t('Ends in') : t('Starts in')}:</Text>
          {blocksRemaining || blocksUntilStart ? (
            <Flex alignItems="center">
              <Link external href={getBscScanLink(hasPoolStarted ? endBlock : startBlock, 'countdown')}>
                <Balance small value={blocksToDisplay} decimals={0} color="primary" />
                <Text small ml="4px" color="primary" textTransform="lowercase">
                  {t('Blocks')}
                </Text>
                <TimerIcon ml="4px" color="primary" />
              </Link>
            </Flex>
          ) : (
            <Skeleton width="54px" height="21px" />
          )}
        </Flex>
      )}
      <Flex mb="2px" justifyContent={alignLinksToRight ? 'flex-end' : 'flex-start'}>
        <LinkExternal href={`/info/token/${earningToken.address}`} bold={false} small>
          {t('See Token Info')}
        </LinkExternal>
      </Flex>
      {poolContractAddress && (
        <Flex mb="2px" justifyContent={alignLinksToRight ? 'flex-end' : 'flex-start'}>
          <LinkExternal href={`${BASE_BSC_SCAN_URL}/address/${poolContractAddress}`} bold={false} small>
            {t('View Contract')}
          </LinkExternal>
        </Flex>
      )}
      {account && isMetaMaskInScope && tokenAddress && (
        <Flex justifyContent={alignLinksToRight ? 'flex-end' : 'flex-start'}>
          <Button
            variant="text"
            p="0"
            height="auto"
            onClick={() =>
              registerToken(
                tokenAddress,
                earningToken.symbol,
                earningToken.decimals,
                `https://tokens.pancakeswap.finance/images/${tokenAddress}.png`,
              )
            }
          >
            <Text color="primary" fontSize="14px">
              {t('Add to Metamask')}
            </Text>
            <MetamaskIcon ml="4px" />
          </Button>
        </Flex>
      )}
    </>
  )
}

export default memo(PoolStatsInfo)
