import styled from 'styled-components'
import { Text, Flex, Box, CloseIcon, IconButton, useMatchBreakpoints } from '@payflowswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { usePhishingBannerManager } from 'state/user/hooks'
import { APP_URL } from 'config/constants/endpoints'

const Container = styled(Flex)`
  overflow: hidden;
  height: 100%;
  padding: 12px;
  align-items: center;
  background: linear-gradient(0deg, rgba(57, 100, 208, 1) 0%, rgba(45, 193, 201, 1) 100%);
  ${({ theme }) => theme.mediaQueries.md} {
    padding: 0px;
    background: linear-gradient(0deg, rgba(57, 100, 208, 1) 0%, rgba(45, 193, 201, 1) 100%);
  }
`

const InnerContainer = styled(Flex)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`

const SpeechBubble = styled.div`
  background: rgba(39, 38, 44, 0.4);
  border-radius: 16px;
  padding: 8px;
  width: 60%;
  height: 80%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  & ${Text} {
    flex-shrink: 0;
    margin-right: 4px;
  }
`

const PhishingWarningBanner: React.FC = () => {
  const { t } = useTranslation()
  const [, hideBanner] = usePhishingBannerManager()
  const { isMobile, isMd } = useMatchBreakpoints()
  const warningText = t(`please make sure you're visiting ${APP_URL} - check the URL carefully.`)
  const warningTextAsParts = warningText.split(APP_URL)
  const warningTextComponent = (
    <>
      <Text as="span" color="warning" small bold textTransform="uppercase">
        {t('Phishing warning: ')}
      </Text>
      {warningTextAsParts.map((text, i) => (
        <Text
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          small
          as="span"
          bold={text === APP_URL}
          color={text === APP_URL ? '#FFFFFF' : '#BDC2C4'}
        >
          {text}
        </Text>
      ))}
    </>
  )
  return (
    <Container className="warning-banner">
      {isMobile || isMd ? (
        <>
          <Box>{warningTextComponent}</Box>
          <IconButton onClick={hideBanner} variant="text">
            <CloseIcon color="#FFFFFF" />
          </IconButton>
        </>
      ) : (
        <>
          <InnerContainer>
            <picture>
              <source type="image/webp" srcSet="/images/decorations/phishing-warning-bunny.webp" />
              <source type="image/png" srcSet="/images/decorations/phishing-warning-bunny.png" />
              <img src="/images/decorations/phishing-warning-bunny.png" alt="phishing-warning" width="92px" />
            </picture>
            <SpeechBubble>{warningTextComponent}</SpeechBubble>
          </InnerContainer>
          <IconButton onClick={hideBanner} variant="text">
            <CloseIcon color="#FFFFFF" />
          </IconButton>
        </>
      )}
    </Container>
  )
}

export default PhishingWarningBanner
