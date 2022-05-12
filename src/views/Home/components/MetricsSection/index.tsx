import { LogoIcon, Heading, Flex, ChartIcon, CommunityIcon, SwapIcon } from '@payflowswap/uikit'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import { formatLocalisedCompactNumber, formatNumber } from 'utils/formatBalance'
import useSWRImmutable from 'swr/immutable'
import IconCard, { IconCardData } from '../IconCard'
import StatCardContent from './StatCardContent'

const Stats = () => {
  const { t } = useTranslation()
  const { theme } = useTheme()

  const { data: tvl } = useSWRImmutable('tvl')
  const { data: txCount } = useSWRImmutable('totalTx30Days')
  const { data: addressCount } = useSWRImmutable('addressCount30Days')
  const trades = formatLocalisedCompactNumber(txCount)
  const users = formatLocalisedCompactNumber(addressCount)
  const tvlString = tvl ? formatLocalisedCompactNumber(tvl) : '-'

  // const totalLock = useTotalValueLock()
  // const tvlText = t('And those users are now entrusting the platform with over $%tvl% in funds.', { tvl: tvlString })
  // const [entrusting, inFunds] = tvlText.split(tvlString)

  const UsersCardData: IconCardData = {
    icon: <CommunityIcon color="secondary" width="36px" />,
  }

  const TradesCardData: IconCardData = {
    icon: <SwapIcon color="primary" width="36px" />,
  }

  const StakedCardData: IconCardData = {
    icon: <ChartIcon color="failure" width="36px" />,
  }

  return (
    <Flex justifyContent="center" alignItems="center" flexDirection="column">
      <LogoIcon height="96px" width="96px" mb="24px" />
      <Heading textAlign="center" scale="xl">
        {t('The next DeFi multi-dashboard.')}
      </Heading>
      <Heading textAlign="center" scale="xl" mb="32px">
        {t('Earn passive income, long term.')}
      </Heading>
      {/* <Text textAlign="center" color="textSubtle">
        {t('PayFlow Swap has the most users of any decentralized platform, ever.')}
      </Text>
      <Flex flexWrap="wrap">
        <Text display="inline" textAlign="center" color="textSubtle" mb="20px">
          {entrusting}
          <>{tvl ? <>{tvlString}</> : <Skeleton display="inline-block" height={16} width={70} mt="2px" />}</>
          {inFunds}
        </Text>
      </Flex>

      <Text textAlign="center" color="textSubtle" bold mb="32px">
        {t('Will you join them?')}
      </Text> */}

      <Flex flexDirection={['column', null, null, 'row']}>
        <IconCard
          {...UsersCardData}
          background="#090d35"
          mr={[null, null, null, '16px']}
          mb={['16px', null, null, '0']}
        >
          <StatCardContent
            headingText={t('%users% users', { users })}
            bodyText={t('in the last 30 days')}
            highlightColor={theme.colors.secondary}
          />
        </IconCard>
        <IconCard
          {...TradesCardData}
          background="#090d35"
          mr={[null, null, null, '16px']}
          mb={['16px', null, null, '0']}
        >
          <StatCardContent
            headingText={t('%trades% trades', { trades })}
            bodyText={t('made in the last 30 days')}
            highlightColor={theme.colors.primary}
          />
        </IconCard>
        <IconCard {...StakedCardData} background="#090d35">
          <StatCardContent
            headingText={t('$%tvl% staked', { tvl: tvlString })}
            bodyText={t('Locked accross all pools')}
            highlightColor={theme.colors.failure}
          />
        </IconCard>
      </Flex>
    </Flex>
  )
}

export default Stats
