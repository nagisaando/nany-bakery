import React, {useEffect} from 'react'
import {getShopListPageData} from '../../utils/shopListPage'
import ShopListPage from '../../components/ShopListPage'

export default function Page({
  story,
  categories,
  firstPageShopList,
  navigationData,
  footerData,
  totalPage,
  preview,
}) {
  return (
    <ShopListPage
      story={story}
      categories={categories}
      firstPageShopList={firstPageShopList}
      navigationData={navigationData}
      footerData={footerData}
      totalPage={totalPage}
    />
  )
}

export async function getStaticProps({preview = false}) {
  let shopListPageData = await getShopListPageData(preview)
  return {
    props: {
      story: shopListPageData.story,
      categories: shopListPageData.categories,
      firstPageShopList: shopListPageData.shopList,
      navigationData: shopListPageData.navigationData,
      footerData: shopListPageData.footerData,
      totalPage: shopListPageData.totalPage,
      preview,
    },
  }
}
