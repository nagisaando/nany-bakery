import React from 'react'
import Layout from '../components/Layout'
import DynamicComponent from '../components/DynamicComponent'
import {getGlobalData} from '../utils/globalData'
import Storyblok, {useStoryblok} from '../utils/storyblok'
import NotFoundPage from '../components/NotFoundPage'

export default function Page404({preview, navigationData, footerData, logo, whatsapp}) {
  const enableBridge = true // load the storyblok bridge everywhere
  // const enableBridge = preview; // load only inside preview mode
  const storyLoaded = useStoryblok(null, enableBridge)

  let content = <NotFoundPage />

  if (storyLoaded && storyLoaded.content) content = <DynamicComponent blok={storyLoaded.content} />

  return (
    <Layout
      navigationBlok={navigationData.content}
      footerBlok={footerData.content}
      logo={logo}
      whatsapp={whatsapp}
    >
      {content}
    </Layout>
  )
}

export async function getStaticProps({preview = false}) {
  let globalData = await getGlobalData(preview)

  return {
    props: {
      navigationData: globalData.navigationData,
      footerData: globalData.footerData,
      logo: globalData.logo,
      whatsapp: globalData.whatsapp,
      preview,
    },
  }
}
