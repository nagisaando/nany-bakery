// import React from 'react'
import Layout from '../components/Layout'
import DynamicComponent from '../components/DynamicComponent'
import React, {useEffect} from 'react'
import Storyblok, {useStoryblok} from '../utils/storyblok'
import {getGlobalData} from '../utils/globalData'

export default function Page({story, navigationData, footerData, logo, whatsapp, preview}) {
  const enableBridge = true // load the storyblok bridge everywhere
  // use the preview variable to enable the bridge only in preview mode
  // const enableBridge = preview;
  story = useStoryblok(story, enableBridge)
  navigationData = useStoryblok(navigationData, enableBridge)
  footerData = useStoryblok(footerData, enableBridge)

  return (
    <Layout
      navigationBlok={navigationData.content}
      footerBlok={footerData.content}
      logo={logo}
      whatsapp={whatsapp}
    >
      <DynamicComponent blok={story.content} whatsapp={whatsapp} />
      <style jsx global>{`
        body {
          font-family: 'Poppins', sans-serif;
        }
        a {
          transition: all 100ms ease-in;
        }
        a:hover {
          opacity: 0.6;
        }
      `}</style>
    </Layout>
  )
}

export async function getStaticProps({preview = false}) {
  let sbParams = {
    version: 'draft', // or "published"
    resolve_relations: ['FeaturedProducts.items', 'FeaturedRecipes.items'],
  }

  if (preview) {
    sbParams.version = 'draft'
    sbParams.cv = Date.now()
  }

  let {data} = await Storyblok.get(`cdn/stories/home`, sbParams)
  let globalData = await getGlobalData(preview)

  return {
    props: {
      story: data ? data.story : false,
      navigationData: globalData.navigationData,
      footerData: globalData.footerData,
      logo: globalData.logo,
      whatsapp: globalData.whatsapp,
      preview,
    },
  }
}
