import Layout from './Layout'
import React, {useEffect} from 'react'
import Storyblok, {useStoryblok} from '../utils/storyblok'
import {getrecipeListPageData} from '../utils/recipeListPage'
import RecipeCard from './RecipeCard'
import Categories from './Categories'

const RecipeListPage = ({
  story,
  categories,
  recipeList,
  navigationData,
  footerData,
  categoryTitle,
}) => {
  const enableBridge = true // load the storyblok bridge everywhere
  useEffect(() => {
    async function retrieveObjectData() {
      let sbParams = {
        version: 'draft', // or "published"
      }
      let recipeListParam = {starts_with: 'recipe/', is_startpage: 0}
      let recipeList = await Storyblok.get(`cdn/stories`, recipeListParam)
      console.log(recipeList)
      const response = await Storyblok.get(`cdn/stories/recipe`)
      console.log(response)
    }
    retrieveObjectData()
  }, [])
  story = useStoryblok(story, enableBridge)
  categories = useStoryblok(categories, enableBridge)
  navigationData = useStoryblok(navigationData, enableBridge)
  footerData = useStoryblok(footerData, enableBridge)

  return (
    <Layout navigationBlok={navigationData.content} footerBlok={footerData.content}>
      <div className="px-5 md:px-10 py-40  | container | mx-auto">
        <h1 className="text-5xl capitalize font-medium |  my-10">
          {categoryTitle ? categoryTitle : story.content.title}
        </h1>
        <div className="  mb-14 | lg:flex gap-10">
          <div>
            {recipeList.length > 0 ? (
              <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-16 ">
                {recipeList.map((blok, i) => {
                  return (
                    <li key={blok.uuid} className="">
                      <RecipeCard blok={blok} />
                    </li>
                  )
                })}
              </ul>
            ) : (
              ''
            )}
          </div>
          {categories ? <Categories blok={categories.stories} /> : ''}
        </div>
      </div>
      <style jsx global>{`
        body {
          font-family: 'Poppins', sans-serif;
        }
        a {
          transition: all 100ms ease-in;
        }
        a:hover {
          opacity: 0.6;
        }
      `}</style>
    </Layout>
  )
}

export default RecipeListPage
