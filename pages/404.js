import React from 'react'
import Layout from '../components/Layout'
import DynamicComponent from '../components/DynamicComponent'

import Storyblok, {useStoryblok} from '../utils/storyblok'

export default function Page404({preview, navigationData, footerData}) {
  const enableBridge = true // load the storyblok bridge everywhere
  // const enableBridge = preview; // load only inside preview mode
  const storyLoaded = useStoryblok(null, enableBridge)

  let content = <h1>Not found</h1>

  if (storyLoaded && storyLoaded.content) content = <DynamicComponent blok={storyLoaded.content} />

  return (
    <Layout navigationBlok={navigationData.content} footerBlok={footerData.content}>
      {content}
    </Layout>
  )
}

export async function getStaticProps({preview = false}) {
  let sbParams = {
    version: 'draft', // or "published"
    resolve_relations: ['FeaturedProducts.items', 'FeaturedRecipes.items'],
  }
  let navigationData = await Storyblok.get(`cdn/stories/navigation`, sbParams)
  let footerData = await Storyblok.get(`cdn/stories/footer`, sbParams)
  return {
    props: {
      navigationData: navigationData.data ? navigationData.data.story : false,
      footerData: footerData.data ? footerData.data.story : false,
      preview,
    },
  }
}
