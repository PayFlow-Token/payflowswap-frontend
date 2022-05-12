import { Text, TokenPairImage as UITokenPairImage, useMatchBreakpoints } from '@payflowswap/uikit'
import BigNumber from 'bignumber.js'
import { TokenPairImage } from 'components/TokenImage'
import { useTranslation } from 'contexts/Localization'
import { memo } from 'react'
import { DeserializedPool } from 'state/types'
import styled from 'styled-components'
import { BIG_ZERO } from 'utils/bigNumber'
import BaseCell, { CellContent } from './BaseCell'

interface NameCellProps {
  pool: DeserializedPool
}

const StyledCell = styled(BaseCell)`
  flex: 5;
  flex-direction: row;
  padding-left: 12px;
  ${({ theme }) => theme.mediaQueries.sm} {
    flex: 1 0 150px;
    padding-left: 32px;
  }
`

const NameCell: React.FC<NameCellProps> = ({ pool }) => {
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()
  const { sousId, stakingToken, earningToken, userData, isFinished } = pool
  const hasVaultShares = false

  const stakingTokenSymbol = stakingToken.symbol
  const earningTokenSymbol = earningToken.symbol

  const stakedBalance = userData?.stakedBalance ? new BigNumber(userData.stakedBalance) : BIG_ZERO
  const isStaked = stakedBalance.gt(0)

  const showStakedTag = isStaked

  let title: React.ReactNode = `${t('Earn')} ${earningTokenSymbol}`
  let subtitle: React.ReactNode = `${t('Stake')} ${stakingTokenSymbol}`
  const showSubtitle = sousId !== 0 || (sousId === 0 && !isMobile)

  return (
    <StyledCell role="cell">
      <TokenPairImage primaryToken={earningToken} secondaryToken={stakingToken} mr="8px" width={40} height={40} />
      <CellContent>
        {showStakedTag && (
          <Text fontSize="12px" bold color={isFinished ? 'failure' : 'secondary'} textTransform="uppercase">
            {t('Staked')}
          </Text>
        )}
        <Text bold={!isMobile} small={isMobile}>
          {title}
        </Text>
        {showSubtitle && (
          <Text fontSize="12px" color="textSubtle">
            {subtitle}
          </Text>
        )}
      </CellContent>
    </StyledCell>
  )
}

export default NameCell
