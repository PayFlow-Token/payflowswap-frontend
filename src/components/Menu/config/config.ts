import {
  MenuItemsType,
  DropdownMenuItemType,
  SwapIcon,
  SwapFillIcon,
  EarnFillIcon,
  NftIcon,
  EarnIcon,
  MoreIcon,
} from '@payflowswap/uikit'
import { ContextApi } from 'contexts/Localization/types'

export type ConfigMenuItemsType = MenuItemsType & { hideSubNav?: boolean }

const config: (t: ContextApi['t'], languageCode?: string) => ConfigMenuItemsType[] = (t) => [
  // /*, languageCode */
  {
    label: t('Trade'),
    icon: SwapIcon,
    fillIcon: SwapFillIcon,
    href: '/swap',
    showItemsOnMobile: false,
    items: [
      {
        label: t('Swap'),
        href: '/swap',
      },
      {
        label: t('Limit'),
        href: '/limit-orders',
      },
      {
        label: t('Liquidity'),
        href: '/liquidity',
      },
      // {
      //   label: t('Perpetual'),
      //   href: `https://perp.payflowswap.com/${perpLangMap(languageCode)}/futures/BTCUSDT`,
      //   type: DropdownMenuItemType.EXTERNAL_LINK,
      // },
    ],
  },
  {
    label: t('Earn'),
    href: '/pools',
    icon: EarnIcon,
    fillIcon: EarnFillIcon,
    items: [
      {
        label: t('Pools'),
        href: '/pools',
      },
    ],
  },
  {
    label: t('NFT'),
    href: '/nft',
    icon: NftIcon,
    fillIcon: NftIcon,
    items: [
      {
        label: t('NFT'),
        href: '/nft',
      },
    ],
  },
  {
    label: '',
    href: '/info',
    icon: MoreIcon,
    hideSubNav: true,
    items: [
      {
        label: t('Socials'),
        href: 'https://linktr.ee/payflow',
        type: DropdownMenuItemType.EXTERNAL_LINK,
      },
      {
        label: t('Audit'),
        href: 'https://github.com/HashEx/public_audits/blob/master/payflow/PayFlow_audit-report.pdf',
        type: DropdownMenuItemType.EXTERNAL_LINK,
      },
      {
        label: t('Support'),
        href: 'mailto:support@payflowtoken.com',
        type: DropdownMenuItemType.EXTERNAL_LINK,
      },
      {
        label: t('Disclaimer'),
        href: 'https://docs.payflowtoken.com/about-us/disclaimer-terms-cookies-and-privacy-policy',
        type: DropdownMenuItemType.EXTERNAL_LINK,
      },
      {
        type: DropdownMenuItemType.DIVIDER,
      },
      {
        label: t('Blog'),
        href: 'https://payflowtoken.com',
        type: DropdownMenuItemType.EXTERNAL_LINK,
      },
      {
        label: t('Docs'),
        href: 'https://docs.payflowtoken.com',
        type: DropdownMenuItemType.EXTERNAL_LINK,
      },
    ],
  },
]

export default config
