import React, {useEffect} from 'react'
import Storyblok from '../../../utils/storyblok'
import {getGlobalData} from '../../../utils/globalData'
import {getRecipeListPageData} from '../../../utils/recipeListPage'
import RecipeListPage from '../../../components/RecipeListPage'
import {useRouter} from 'next/router'
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
  categoryUuid,
}) {
  const router = useRouter()
  const {slug} = router.query
  return (
    <RecipeListPage
      story={story}
      categories={categories}
      firstPageRecipeList={firstPageRecipeList}
      navigationData={navigationData}
      footerData={footerData}
      logo={logo}
      whatsapp={whatsapp}
      categoryTitle={slug}
      totalPage={totalPage}
      categoryUuid={categoryUuid}
    />
  )
}
export async function getStaticProps({params, preview = false}) {
  let {data} = await Storyblok.get(`cdn/stories/recipe-categories/${params.slug}`)
  let categoryUuid = data.story ? data.story.uuid : false
  let recipeListData = await getRecipeListPageData(preview, categoryUuid)
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
      categoryUuid,
      preview,
    },
  }
}

export async function getStaticPaths({}) {
  let {data} = await Storyblok.get('cdn/links/', {
    starts_with: 'recipe-categories/',
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
