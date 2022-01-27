import React, {useEffect} from 'react'
import {getrecipeListPageData} from '../../utils/recipeListPage'
import RecipeListPage from '../../components/RecipeListPage'

export default function Page({
  story,
  categories,
  firstPageRecipeList,
  navigationData,
  footerData,
  totalPage,
  preview,
}) {
  return (
    <RecipeListPage
      story={story}
      categories={categories}
      firstPageRecipeList={firstPageRecipeList}
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
      story: recipeListData.story,
      categories: recipeListData.categories,
      firstPageRecipeList: recipeListData.recipeList,
      navigationData: recipeListData.navigationData,
      footerData: recipeListData.footerData,
      totalPage: recipeListData.totalPage,
      preview,
    },
  }
}
