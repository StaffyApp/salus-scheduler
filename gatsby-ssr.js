import React from "react"
import './src/styles/global.scss'

import MontRegular from './src/fonts/Mont-Regular.otf'
import MontSemiBold from './src/fonts/Mont-SemiBold.otf'
import MontBold from './src/fonts/Mont-Bold.otf'
import MontHeavy from './src/fonts/Mont-Heavy.otf'

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link key="font-regular" rel="preload" as="font" type="font/otf" href={MontRegular} crossOrigin="anonymous" />,
    <link key="font-semibold" rel="preload" as="font" type="font/otf" href={MontSemiBold} crossOrigin="anonymous" />,
    <link key="font-bold" rel="preload" as="font" type="font/otf" href={MontBold} crossOrigin="anonymous" />,
    <link key="font-heavy" rel="preload" as="font" type="font/otf" href={MontHeavy} crossOrigin="anonymous" />,
  ])
}
