import { TranslateFunction } from 'contexts/Localization/types'
import { SalesSectionProps } from '.'

export const swapSectionData = (t: TranslateFunction): SalesSectionProps => ({
  headingText: t('Trade anything. No registration, easy-to-use.'),
  bodyText: t('Trade any token on BNB Smart Chain in seconds, just by connecting your wallet.'),
  reverse: false,
  primaryButton: {
    to: '/swap',
    text: t('Trade Now'),
    external: false,
  },
  secondaryButton: {
    to: 'https://docs.payflowtoken.com',
    text: t('Docs'),
    external: true,
  },
  images: {
    path: '/images/home/trade/',
    attributes: [
      { src: 'BNB', alt: t('BNB token') },
      { src: 'BTC', alt: t('BTC token') },
      { src: 'CAKE', alt: t('CAKE token') },
    ],
  },
})

export const earnSectionData = (t: TranslateFunction): SalesSectionProps => ({
  headingText: t('Mutual crypto staking pools.'),
  bodyText: t(
    "Staking is the best passive income option for crypto beginners, Because they won't be affected by the impermanent loss.",
  ),
  reverse: true,
  primaryButton: {
    to: 'https://docs.google.com/forms/d/e/1FAIpQLSd3V2O-ZfEXXvVlQB4jYiMxS0Rx3KXvhIaC1smk2hEVNGFmFQ/viewform',
    text: t('Apply now'),
    external: true,
  },
  secondaryButton: {
    to: 'https://docs.payflowtoken.com',
    text: t('Docs'),
    external: true,
  },
  images: {
    path: '/images/home/earn/',
    attributes: [
      { src: 'pie', alt: t('Pie chart') },
      { src: 'stonks', alt: t('Stocks chart') },
      { src: 'folder', alt: t('Folder with cake token') },
    ],
  },
})

export const cakeSectionData = (t: TranslateFunction): SalesSectionProps => ({
  headingText: t('PFT let us go with the flow.'),
  bodyText: t('PFT token is the heart of PayFlow Swap. Buy it, spend it, stake it, Safe and fast.'),
  reverse: false,
  primaryButton: {
    to: '/swap?outputCurrency=0xe3B42852a85d38b18076Ab2dd96B0F894CC0636c',
    text: t('Buy PFT'),
    external: false,
  },
  secondaryButton: {
    to: 'https://docs.payflowtoken.com',
    text: t('Docs'),
    external: true,
  },

  images: {
    path: '/images/home/pft/',
    attributes: [{ src: 'coin', alt: t('PFT token') }],
  },
})
