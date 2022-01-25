import Layout from '../../components/Layout'
import DynamicComponent from '../../components/DynamicComponent'
import React, {useEffect} from 'react'
import Storyblok, {useStoryblok} from '../../utils/storyblok'
import ProductCard from '../../components/ProductCard'
import {useRouter} from 'next/router'
export default function Page({story, productList, navigationData, footerData, preview}) {
  const enableBridge = true // load the storyblok bridge everywhere
  const router = useRouter()
  const {slug} = router.query
  useEffect(() => {
    async function retrieveObjectData() {
      let sbParams = {
        version: 'draft', // or "published"
      }

      const response = await Storyblok.get(`cdn/stories/shop/${slug}`)
      console.log(response)
    }
    retrieveObjectData()
  }, [])
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
  }

  if (preview) {
    sbParams.version = 'draft'
    sbParams.cv = Date.now()
  }

  let {data} = await Storyblok.get(`cdn/stories/shop/${params.slug}`)
  //   let {data} = await Storyblok.get(`cdn/stories/home`)
  let productList = await Storyblok.get(`cdn/stories`, {starts_with: 'shop/', is_startpage: 0})
  let navigationData = await Storyblok.get(`cdn/stories/navigation`, sbParams)
  let footerData = await Storyblok.get(`cdn/stories/footer`, sbParams)

  return {
    props: {
      story: data ? data.story : false,
      productList: productList.data ? productList.data.stories : false,
      navigationData: navigationData.data ? navigationData.data.story : false,
      footerData: footerData.data ? footerData.data.story : false,
      preview,
    },
    revalidate: 3600, // revalidate every hour
  }
}

export async function getStaticPaths({locales}) {
  let {data} = await Storyblok.get('cdn/links/', {
    starts_with: 'shop/',
  })

  let paths = []
  Object.keys(data.links).forEach((linkKey) => {
    if (data.links[linkKey].slug === 'shop/') {
      return
    }

    paths.push({params: {slug: data.links[linkKey].slug.replace('shop/', '')}})
  })

  return {
    paths: paths,
    fallback: false,
  }
}
