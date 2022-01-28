import Layout from '../../components/Layout'
import Product from '../../components/Product'
import React, {useEffect} from 'react'
import Storyblok, {useStoryblok} from '../../utils/storyblok'
import {useRouter} from 'next/router'
export default function Page({story, navigationData, footerData, relatedProduct, preview}) {
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
      <Product blok={story.content} relatedProduct={relatedProduct} />
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

  let {data} = await Storyblok.get(`cdn/stories/shop/${params.slug}`, {
    resolve_relations: ['Product.categories'],
  })
  let navigationData = await Storyblok.get(`cdn/stories/navigation`, sbParams)
  let footerData = await Storyblok.get(`cdn/stories/footer`, sbParams)
  let relatedProduct = []
  if (data && data.story.content.categories && data.story.content.categories.length > 0) {
    relatedProduct = await Storyblok.get(`cdn/stories/`, {
      starts_with: 'shop/',
      is_startpage: 0,
      per_page: 4,
      page: 1,
      ['filter_query[categories][exists]']: data.story.content.categories[0].uuid,
    })
  }
  if (relatedProduct.data) {
    relatedProduct = relatedProduct.data.stories
      .filter((el) => {
        return el.uuid !== data.story.uuid
      })
      .slice(0, 3)
  }

  return {
    props: {
      story: data ? data.story : false,
      navigationData: navigationData.data ? navigationData.data.story : false,
      footerData: footerData.data ? footerData.data.story : false,
      preview,
      relatedProduct: relatedProduct.length > 0 ? relatedProduct : [],
    },
  }
}

export async function getStaticPaths() {
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
