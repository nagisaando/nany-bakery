import React, {useEffect} from 'react'
import {getShopListPageData} from '../../utils/shopListPage'
import {getGlobalData} from '../../utils/globalData'
import ShopListPage from '../../components/ShopListPage'

export default function Page({
  story,
  categories,
  firstPageShopList,
  navigationData,
  footerData,
  logo,
  whatsapp,
  totalPage,
  preview,
}) {
  return (
    <ShopListPage
      story={story}
      categories={categories}
      firstPageShopList={firstPageShopList}
      navigationData={navigationData}
      logo={logo}
      whatsapp={whatsapp}
      footerData={footerData}
      totalPage={totalPage}
    />
  )
}

export async function getStaticProps({preview = false}) {
  let shopListPageData = await getShopListPageData(preview)
  let globalData = await getGlobalData(preview)
  return {
    props: {
      story: shopListPageData.story,
      categories: shopListPageData.categories,
      firstPageShopList: shopListPageData.shopList,
      totalPage: shopListPageData.totalPage,
      navigationData: globalData.navigationData,
      footerData: globalData.footerData,
      logo: globalData.logo,
      whatsapp: globalData.whatsapp,

      preview,
    },
  }
}
