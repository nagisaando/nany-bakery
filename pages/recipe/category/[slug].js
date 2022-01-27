import React, {useEffect} from 'react'
import Storyblok from '../../../utils/storyblok'
import {getrecipeListPageData} from '../../../utils/recipeListPage'
import RecipeListPage from '../../../components/RecipeListPage'
import {useRouter} from 'next/router'
export default function Page({
  story,
  categories,
  firstPageRecipeList,
  navigationData,
  footerData,
  totalPage,
  preview,
  uuid,
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
      categoryTitle={slug}
      totalPage={totalPage}
      uuid={uuid}
    />
  )
}
export async function getStaticProps({params, preview = false}) {
  console.log(params)
  let {data} = await Storyblok.get(`cdn/stories/recipe-categories/${params.slug}`)
  let uuid = data.story ? data.story.uuid : false
  let recipeListData = await getrecipeListPageData(preview, uuid)

  return {
    props: {
      story: recipeListData.story,
      categories: recipeListData.categories,
      firstPageRecipeList: recipeListData.recipeList,
      navigationData: recipeListData.navigationData,
      footerData: recipeListData.footerData,
      totalPage: recipeListData.totalPage,
      uuid,
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
