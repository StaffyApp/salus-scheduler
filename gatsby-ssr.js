import React from "react"
import './src/styles/global.scss'

import MontRegular from './src/fonts/Mont-Regular.woff2'
import MontSemiBold from './src/fonts/Mont-SemiBold.woff2'
import MontBold from './src/fonts/Mont-Bold.woff2'
import MontHeavy from './src/fonts/Mont-Heavy.woff2'

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <meta key="referrer-policy" name="referrer" content="origin" />,
    <link key="font-regular" rel="preload" as="font" type="font/woff2" href={MontRegular} crossOrigin="anonymous" />,
    <link key="font-semibold" rel="preload" as="font" type="font/woff2" href={MontSemiBold} crossOrigin="anonymous" />,
    <link key="font-bold" rel="preload" as="font" type="font/woff2" href={MontBold} crossOrigin="anonymous" />,
    <link key="font-heavy" rel="preload" as="font" type="font/woff2" href={MontHeavy} crossOrigin="anonymous" />,
  ])
}
