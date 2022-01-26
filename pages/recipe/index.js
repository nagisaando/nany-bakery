import React, {useEffect} from 'react'
import {getrecipeListPageData} from '../../utils/recipeListPage'
import RecipeListPage from '../../components/RecipeListPage'

export default function Page({
  recipeListData,
  categories,
  recipeList,
  navigationData,
  footerData,
  totalPage,
  preview,
}) {
  return (
    <RecipeListPage
      recipeListData={recipeListData}
      categories={categories}
      recipeList={recipeList}
      navigationData={navigationData}
      footerData={footerData}
      totalPage={totalPage}
    />
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
  let recipeListData = await getrecipeListPageData(sbParams)
  return {
    props: {
      recipeListData: recipeListData.parentContent,
      categories: recipeListData.categories,
      recipeList: recipeListData.recipeList,
      navigationData: recipeListData.navigationData,
      footerData: recipeListData.footerData,
      totalPage: recipeListData.totalPage,
      preview,
    },
  }
}
