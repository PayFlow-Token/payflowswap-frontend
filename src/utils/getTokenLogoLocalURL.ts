import { APP_URL } from 'config/constants/endpoints'

const getTokenLogoLocalURL = (address: string) =>
  typeof window !== 'undefined'
    ? `${window.location.protocol}//${window.location.host}/images/tokens/${address}.png`
    : `${APP_URL}/images/tokens/${address}.png`

export default getTokenLogoLocalURL
