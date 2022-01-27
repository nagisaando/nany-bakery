import React, {useEffect} from 'react'
import {getShopListPageData} from '../../../utils/shopListPage'
import ShopListPage from '../../../components/ShopListPage'
import Storyblok from '../../../utils/storyblok'
import {useRouter} from 'next/router'
export default function Page({
  story,
  categories,
  firstPageShopList,
  navigationData,
  footerData,
  totalPage,
  preview,
  categoryUuid,
}) {
  const router = useRouter()
  const {slug} = router.query
  return (
    <ShopListPage
      story={story}
      categories={categories}
      firstPageShopList={firstPageShopList}
      navigationData={navigationData}
      footerData={footerData}
      categoryTitle={slug}
      totalPage={totalPage}
      categoryUuid={categoryUuid}
    />
  )
}

export async function getStaticProps({params, preview = false}) {
  let {data} = await Storyblok.get(`cdn/stories/shop-categories/${params.slug}`)
  let categoryUuid = data.story ? data.story.uuid : false
  let shopListPageData = await getShopListPageData(preview, categoryUuid)
  return {
    props: {
      story: shopListPageData.story,
      categories: shopListPageData.categories,
      firstPageShopList: shopListPageData.shopList,
      navigationData: shopListPageData.navigationData,
      footerData: shopListPageData.footerData,
      totalPage: shopListPageData.totalPage,
      categoryUuid,
      preview,
    },
  }
}

export async function getStaticPaths({}) {
  let {data} = await Storyblok.get('cdn/links/', {
    starts_with: 'shop-categories/',
  })

  let paths = []
  Object.keys(data.links).forEach((linkKey) => {
    paths.push({params: {slug: data.links[linkKey].name}})
  })

  return {
    paths: paths,
    fallback: false,
  }
}
