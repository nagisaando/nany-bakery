import React, {useEffect} from 'react'
import {getRecipeListPageData} from '../../utils/recipeListPage'
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
export async function getStaticProps({preview = false}) {
  let recipeListData = await getRecipeListPageData(preview)
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
