import { ContextApi } from 'contexts/Localization/types'
import { APP_URL } from './endpoints'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'PayFlow Swap',
  description:
    'The next DeFi multi-dashboard on the BNB Smart Chain, Earn passive income, long term. Swap, Stake and earn.',
  image: `${APP_URL}/images/hero.png`,
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  let basePath
  if (path.startsWith('/swap')) {
    basePath = '/swap'
  } else if (path.startsWith('/add')) {
    basePath = '/add'
  } else if (path.startsWith('/remove')) {
    basePath = '/remove'
  } else if (path.startsWith('/teams')) {
    basePath = '/teams'
  } else if (path.startsWith('/voting/proposal') && path !== '/voting/proposal/create') {
    basePath = '/voting/proposal'
  } else if (path.startsWith('/nfts/collections')) {
    basePath = '/nfts/collections'
  } else if (path.startsWith('/nfts/profile')) {
    basePath = '/nfts/profile'
  } else if (path.startsWith('/pancake-squad')) {
    basePath = '/pancake-squad'
  } else {
    basePath = path
  }

  switch (basePath) {
    case '/':
      return {
        title: `${t('Home')} | ${t('PayFlow Swap')}`,
      }
    case '/swap':
      return {
        title: `${t('Exchange')} | ${t('PayFlow Swap')}`,
      }
    case '/add':
      return {
        title: `${t('Add Liquidity')} | ${t('PayFlow Swap')}`,
      }
    case '/remove':
      return {
        title: `${t('Remove Liquidity')} | ${t('PayFlow Swap')}`,
      }
    case '/liquidity':
      return {
        title: `${t('Liquidity')} | ${t('PayFlow Swap')}`,
      }
    case '/find':
      return {
        title: `${t('Import Pool')} | ${t('PayFlow Swap')}`,
      }
    case '/competition':
      return {
        title: `${t('Trading Battle')} | ${t('PayFlow Swap')}`,
      }
    case '/prediction':
      return {
        title: `${t('Prediction')} | ${t('PayFlow Swap')}`,
      }
    case '/prediction/leaderboard':
      return {
        title: `${t('Leaderboard')} | ${t('PayFlow Swap')}`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t('PayFlow Swap')}`,
      }
    case '/farms/auction':
      return {
        title: `${t('Farm Auctions')} | ${t('PayFlow Swap')}`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('PayFlow Swap')}`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} | ${t('PayFlow Swap')}`,
      }
    case '/ifo':
      return {
        title: `${t('Initial Farm Offering')} | ${t('PayFlow Swap')}`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} | ${t('PayFlow Swap')}`,
      }
    case '/voting':
      return {
        title: `${t('Voting')} | ${t('PayFlow Swap')}`,
      }
    case '/voting/proposal':
      return {
        title: `${t('Proposals')} | ${t('PayFlow Swap')}`,
      }
    case '/voting/proposal/create':
      return {
        title: `${t('Make a Proposal')} | ${t('PayFlow Swap')}`,
      }
    case '/info':
      return {
        title: `${t('Overview')} | ${t('Info & Analytics')}`,
        description: 'View statistics for Pancakeswap exchanges.',
      }
    case '/info/pools':
      return {
        title: `${t('Pools')} | ${t('Info & Analytics')}`,
        description: 'View statistics for Pancakeswap exchanges.',
      }
    case '/info/tokens':
      return {
        title: `${t('Tokens')} | ${t('Info & Analytics')}`,
        description: 'View statistics for Pancakeswap exchanges.',
      }
    case '/nfts':
      return {
        title: `${t('Overview')} | ${t('PayFlow Swap')}`,
      }
    case '/nfts/collections':
      return {
        title: `${t('Collections')} | ${t('PayFlow Swap')}`,
      }
    case '/nfts/activity':
      return {
        title: `${t('Activity')} | ${t('PayFlow Swap')}`,
      }
    case '/nfts/profile':
      return {
        title: `${t('Profile')} | ${t('PayFlow Swap')}`,
      }
    case '/pancake-squad':
      return {
        title: `${t('Pancake Squad')} | ${t('PayFlow Swap')}`,
      }
    default:
      return null
  }
}
