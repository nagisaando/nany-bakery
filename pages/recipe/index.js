import React, {useEffect} from 'react'
import {getrecipeListPageData} from '../../utils/recipeListPage'
import RecipeListPage from '../../components/RecipeListPage'

export default function Page({story, categories, recipeList, navigationData, footerData, preview}) {
  return (
    <RecipeListPage
      story={story}
      categories={categories}
      recipeList={recipeList}
      navigationData={navigationData}
      footerData={footerData}
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
      recipeList: recipeListData.recipeList,
      navigationData: recipeListData.navigationData,
      footerData: recipeListData.footerData,
      preview,
    },
  }
}
