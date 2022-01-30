import React, {useEffect} from 'react'
import {getRecipeListPageData} from '../../utils/recipeListPage'
import {getGlobalData} from '../../utils/globalData'
import RecipeListPage from '../../components/RecipeListPage'

export default function Page({
  story,
  categories,
  firstPageRecipeList,
  navigationData,
  footerData,
  logo,
  whatsapp,
  totalPage,
  preview,
}) {
  return (
    <RecipeListPage
      story={story}
      categories={categories}
      firstPageRecipeList={firstPageRecipeList}
      navigationData={navigationData}
      logo={logo}
      whatsapp={whatsapp}
      footerData={footerData}
      totalPage={totalPage}
    />
  )
}
export async function getStaticProps({preview = false}) {
  let recipeListData = await getRecipeListPageData(preview)
  let globalData = await getGlobalData(preview)
  return {
    props: {
      story: recipeListData.story,
      categories: recipeListData.categories,
      firstPageRecipeList: recipeListData.recipeList,
      totalPage: recipeListData.totalPage,
      navigationData: globalData.navigationData,
      footerData: globalData.footerData,
      logo: globalData.logo,
      whatsapp: globalData.whatsapp,
      preview,
    },
  }
}
