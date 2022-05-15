import { FooterLinkType } from '@payflowswap/uikit'
import { ContextApi } from 'contexts/Localization/types'

export const footerLinks: (t: ContextApi['t']) => FooterLinkType[] = (t) => [
  {
    label: t('About'),
    items: [
      {
        label: t('Contact'),
        href: 'https://docs.payflowtoken.com/contact-us',
        isHighlighted: true,
      },
      {
        label: t('Website'),
        href: 'https://payflowtoken.com/',
      },
      {
        label: t('Blog'),
        href: 'https://payflowtoken.medium.com/',
      },
      {
        label: t('Community'),
        href: 'https://t.me/payflowtoken',
      },
      {
        label: t('PFT token'),
        href: 'https://docs.payflowtoken.com/about-us/what-is-payflow',
      },
      {
        label: '—',
      },
      {
        label: t('Webshop (coming Soon)'),
        href: '#',
        isHighlighted: true,
      },
    ],
  },
  {
    label: t('Help'),
    items: [
      {
        label: t('Customer Support'),
        href: 'https://docs.payflowtoken.com/contact-us',
      },
      {
        label: t('Troubleshooting'),
        href: 'https://docs.payflowtoken.com/',
      },
      {
        label: t('Ask The Community'),
        href: 'https://t.me/payflowtoken',
      },
    ],
  },
  {
    label: t('Developers'),
    items: [
      {
        label: 'Github',
        href: 'https://github.com/PayFlow-Token/PayFlow-Token',
      },
      {
        label: t('Documentation'),
        href: 'https://docs.payflowtoken.com/',
      },
      {
        label: t('Audits'),
        href: 'https://github.com/HashEx/public_audits/blob/master/payflow/PayFlow_audit-report.pdf',
      },
      {
        label: t('Careers'),
        href: 'https://t.me/ykza6',
      },
    ],
  },
]
