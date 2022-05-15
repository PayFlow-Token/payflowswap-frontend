import { useMemo } from 'react'

/**
 * make your custom hook to control should render specific banner or not
 * add new campaign banner easily
 *
 * @example
 * ```ts
 *  {
 *    shouldRender: isRenderIFOBanner,
 *    banner: <IFOBanner />,
 *  },
 * ```
 */
export const useMultipleBannerConfig = () => {
  return useMemo(
    () =>
      [
        {
          shouldRender: false,
          banner: <div></div>,
        },
      ]
        .filter((d) => d.shouldRender)
        .map((d) => d.banner),
    [],
  )
}
