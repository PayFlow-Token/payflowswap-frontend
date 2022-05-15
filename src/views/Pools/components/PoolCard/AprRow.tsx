import { Flex, TooltipText, useTooltip } from '@payflowswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { DeserializedPool } from 'state/types'
import BigNumber from 'bignumber.js'
import Apr from 'views/Pools/components/Apr'

interface AprRowProps {
  pool: DeserializedPool
  stakedBalance: BigNumber
  performanceFee?: number
  showIcon?: boolean
}

const AprRow: React.FC<AprRowProps> = ({ pool, stakedBalance, performanceFee = 0, showIcon = true }) => {
  const { t } = useTranslation()

  const tooltipContent = t('This pool’s rewards aren’t compounded automatically, so we show APR')

  const { targetRef, tooltip, tooltipVisible } = useTooltip(tooltipContent, { placement: 'bottom-start' })

  return (
    <Flex alignItems="center" justifyContent="space-between">
      {tooltipVisible && tooltip}
      <TooltipText ref={targetRef}>{`${t('APR')}:`}</TooltipText>
      <Apr pool={pool} stakedBalance={stakedBalance} performanceFee={performanceFee} showIcon={showIcon} />
    </Flex>
  )
}

export default AprRow
