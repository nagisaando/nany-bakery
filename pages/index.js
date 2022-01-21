// import React from 'react'
import Layout from '../components/Layout'
import DynamicComponent from '../components/DynamicComponent'
import React, {useEffect} from 'react'
import Storyblok, {useStoryblok} from '../utils/storyblok'

export default function Page({story, navigationData, footerData, preview}) {
  const enableBridge = true // load the storyblok bridge everywhere
  useEffect(() => {
    async function retrieveObjectData() {
      let sbParams = {
        version: 'draft', // or "published"
        resolve_relations: ['FeaturedProducts.items', 'FeaturedRecipe.items'],
        // language: locale,
      }
      const response = await Storyblok.get(`cdn/stories/home`, sbParams)
      console.log(response)
    }
    retrieveObjectData()
  }, [])
  // use the preview variable to enable the bridge only in preview mode
  // const enableBridge = preview;
  story = useStoryblok(story, enableBridge)
  navigationData = useStoryblok(navigationData, enableBridge)
  footerData = useStoryblok(footerData, enableBridge)

  return (
    <Layout navigationBlok={navigationData.content} footerBlok={footerData.content}>
      <DynamicComponent blok={story.content} />
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

export async function getStaticProps({params, preview = false}) {
  let sbParams = {
    version: 'draft', // or "published"
    resolve_relations: ['FeaturedItem.items'],
    // language: locale,
  }

  if (preview) {
    sbParams.version = 'draft'
    sbParams.cv = Date.now()
  }

  let {data} = await Storyblok.get(`cdn/stories/home`, sbParams)
  let navigationData = await Storyblok.get(`cdn/stories/navigation`, sbParams)
  let footerData = await Storyblok.get(`cdn/stories/footer`, sbParams)

  return {
    props: {
      story: data ? data.story : false,
      navigationData: navigationData.data ? navigationData.data.story : false,
      footerData: footerData.data ? footerData.data.story : false,
      preview,
    },
    revalidate: 3600, // revalidate every hour
  }
}
