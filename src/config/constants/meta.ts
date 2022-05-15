import { ContextApi } from 'contexts/Localization/types'
import { APP_URL } from './endpoints'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'PayFlowSwap',
  description:
    'The next DeFi multi-dashboard on the BNB Smart Chain. Earn passive income, long term. Swap, Stake and Earn.',
  image: `https://payflowswap.com/images/hero.png`,
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
  } else if (path.startsWith('/payflow-squad')) {
    basePath = '/payflow-squad'
  } else {
    basePath = path
  }

  switch (basePath) {
    case '/':
      return {
        title: `${t('Home')} | ${t('PayFlowSwap')}`,
      }
    case '/swap':
      return {
        title: `${t('Exchange')} | ${t('PayFlowSwap')}`,
      }
    case '/add':
      return {
        title: `${t('Add Liquidity')} | ${t('PayFlowSwap')}`,
      }
    case '/remove':
      return {
        title: `${t('Remove Liquidity')} | ${t('PayFlowSwap')}`,
      }
    case '/liquidity':
      return {
        title: `${t('Liquidity')} | ${t('PayFlowSwap')}`,
      }
    case '/find':
      return {
        title: `${t('Import Pool')} | ${t('PayFlowSwap')}`,
      }
    case '/competition':
      return {
        title: `${t('Trading Battle')} | ${t('PayFlowSwap')}`,
      }
    case '/prediction':
      return {
        title: `${t('Prediction')} | ${t('PayFlowSwap')}`,
      }
    case '/prediction/leaderboard':
      return {
        title: `${t('Leaderboard')} | ${t('PayFlowSwap')}`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t('PayFlowSwap')}`,
      }
    case '/farms/auction':
      return {
        title: `${t('Farm Auctions')} | ${t('PayFlowSwap')}`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('PayFlowSwap')}`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} | ${t('PayFlowSwap')}`,
      }
    case '/ifo':
      return {
        title: `${t('Initial Farm Offering')} | ${t('PayFlowSwap')}`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} | ${t('PayFlowSwap')}`,
      }
    case '/voting':
      return {
        title: `${t('Voting')} | ${t('PayFlowSwap')}`,
      }
    case '/voting/proposal':
      return {
        title: `${t('Proposals')} | ${t('PayFlowSwap')}`,
      }
    case '/voting/proposal/create':
      return {
        title: `${t('Make a Proposal')} | ${t('PayFlowSwap')}`,
      }
    case '/info':
      return {
        title: `${t('Info Overview')} | ${t('Info & Analytics')}`,
        description: 'View statistics for Pancakeswap exchanges.',
      }
    case '/info/pools':
      return {
        title: `${t('Info Pools')} | ${t('Info & Analytics')}`,
        description: 'View statistics for Pancakeswap exchanges.',
      }
    case '/info/tokens':
      return {
        title: `${t('Info Tokens')} | ${t('Info & Analytics')}`,
        description: 'View statistics for Pancakeswap exchanges.',
      }
    case '/nfts':
      return {
        title: `${t('NFTs Overview')} | ${t('PayFlowSwap')}`,
      }
    case '/nfts/collections':
      return {
        title: `${t('NFTs Collections')} | ${t('PayFlowSwap')}`,
      }
    case '/nfts/activity':
      return {
        title: `${t('NFTs Activity')} | ${t('PayFlowSwap')}`,
      }
    case '/nfts/profile':
      return {
        title: `${t('NFTs Profile')} | ${t('PayFlowSwap')}`,
      }
    case '/payflow-squad':
      return {
        title: `${t('PayFlow Squad')} | ${t('PayFlowSwap')}`,
      }
    default:
      return null
  }
}
