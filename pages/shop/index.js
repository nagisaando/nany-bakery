import Layout from '../../components/Layout'
import React, {useEffect} from 'react'
import Storyblok, {useStoryblok} from '../../utils/storyblok'
import ProductCard from '../../components/ProductCard'

export default function Page({story, productList, navigationData, footerData, preview}) {
  const enableBridge = true // load the storyblok bridge everywhere
  useEffect(() => {
    async function retrieveObjectData() {
      let sbParams = {
        version: 'draft', // or "published"
        // language: locale,
      }

      const response = await Storyblok.get(`cdn/stories`, {starts_with: 'shop/', is_startpage: 0})
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
      <div className="px-5 md:px-10 py-20 | container | mx-auto">
        {productList.length > 0 ? (
          <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-16 | mt-24 mb-14">
            {productList.map((blok, i) => {
              return (
                <li key={blok.uuid} className="">
                  <ProductCard blok={blok} />
                </li>
              )
            })}
          </ul>
        ) : (
          ''
        )}
      </div>
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

  let {data} = await Storyblok.get(`cdn/stories/shop`)
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
