import { Language } from "../LangSelector/types";
import { FooterLinkType } from "./types";
import { TwitterIcon, TelegramIcon, RedditIcon, InstagramIcon, GithubIcon, DiscordIcon, MediumIcon } from "../Svg";

export const footerLinks: FooterLinkType[] = [
  {
    label: "About",
    items: [
      {
        label: "Contact",
        href: "https://docs.payflowswap.com/contact-us",
      },
      {
        label: "Blog",
        href: "https://pancakeswap.medium.com/",
      },
      {
        label: "Community",
        href: "https://docs.payflowswap.com/contact-us/telegram",
      },
      {
        label: "CAKE",
        href: "https://docs.payflowswap.com/tokenomics/cake",
      },
      {
        label: "—",
      },
      {
        label: "Online Store",
        href: "https://pancakeswap.creator-spring.com/",
        isHighlighted: true,
      },
    ],
  },
  {
    label: "Help",
    items: [
      {
        label: "Customer",
        href: "Support https://docs.payflowswap.com/contact-us/customer-support",
      },
      {
        label: "Troubleshooting",
        href: "https://docs.payflowswap.com/help/troubleshooting",
      },
      {
        label: "Guides",
        href: "https://docs.payflowswap.com/get-started",
      },
    ],
  },
  {
    label: "Developers",
    items: [
      {
        label: "Github",
        href: "https://github.com/payflowswap",
      },
      {
        label: "Documentation",
        href: "https://docs.payflowswap.com",
      },
      {
        label: "Bug Bounty",
        href: "https://app.gitbook.com/@pancakeswap-1/s/pancakeswap/code/bug-bounty",
      },
      {
        label: "Audits",
        href: "https://docs.payflowswap.com/help/faq#is-pancakeswap-safe-has-pancakeswap-been-audited",
      },
      {
        label: "Careers",
        href: "https://docs.payflowswap.com/hiring/become-a-chef",
      },
    ],
  },
];

export const socials = [
  {
    label: "Twitter",
    icon: TwitterIcon,
    href: "https://twitter.com/paypft",
  },
  {
    label: "Telegram",
    icon: TelegramIcon,
    items: [
      {
        label: "English",
        href: "https://t.me/payflowtoken",
      },
      {
        label: "Indonesia",
        href: "https://t.me/PayflowSwapIndonesia",
      },
      // {
      //   label: "中文",
      //   href: "https://t.me/PayflowSwap_CN",
      // },
      // {
      //   label: "Tiếng Việt",
      //   href: "https://t.me/PayflowSwapVN",
      // },
      // {
      //   label: "Italiano",
      //   href: "https://t.me/pancakeswap_ita",
      // },
      // {
      //   label: "русский",
      //   href: "https://t.me/pancakeswap_ru",
      // },
      {
        label: "Türkiye",
        href: "https://t.me/payflow_turkish",
      },
      // {
      //   label: "Português",
      //   href: "https://t.me/PayflowSwapPortuguese",
      // },
      // {
      //   label: "Español",
      //   href: "https://t.me/PancakeswapEs",
      // },
      // {
      //   label: "日本語",
      //   href: "https://t.me/pancakeswapjp",
      // },
      // {
      //   label: "Français",
      //   href: "https://t.me/pancakeswapfr",
      // },
      {
        label: "Dutch",
        href: "https://t.me/pftdutch",
      },
      {
        label: "Arabic",
        href: "https://t.me/payflow_arabic",
      },
      {
        label: "Announcements",
        href: "https://t.me/PayChainFinance",
      },
    ],
  },
  {
    label: "Reddit",
    icon: RedditIcon,
    href: "https://reddit.com/r/payflowtoken",
  },
  {
    label: "Instagram",
    icon: InstagramIcon,
    href: "https://instagram.com/payflowtoken",
  },
  {
    label: "Github",
    icon: GithubIcon,
    href: "https://github.com/PayFlow-Token/PayFlow-Token",
  },
  // {
  //   label: "Discord",
  //   icon: DiscordIcon,
  //   href: "https://discord.gg/pancakeswap",
  // },
  {
    label: "Medium",
    icon: MediumIcon,
    href: "https://payflowtoken.medium.com/",
  },
];

export const langs: Language[] = [...Array(20)].map((_, i) => ({
  code: `en${i}`,
  language: `English${i}`,
  locale: `Locale${i}`,
}));
