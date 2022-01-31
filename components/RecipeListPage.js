import Layout from './Layout'
import React, {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import Storyblok, {useStoryblok} from '../utils/storyblok'
import RecipeCard from './RecipeCard'
import Pagination from './Pagination'

import Categories from './Categories'

const RecipeListPage = ({
  story,
  categories,
  firstPageRecipeList,
  navigationData,
  footerData,
  logo,
  whatsapp,
  categoryTitle,
  totalPage,
  categoryUuid,
}) => {
  const enableBridge = true // load the storyblok bridge everywhere
  const [recipeList, setRecipeList] = useState(firstPageRecipeList)
  const dynamicRoute = useRouter().asPath
  story = useStoryblok(story, enableBridge)
  categories = useStoryblok(categories, enableBridge)
  navigationData = useStoryblok(navigationData, enableBridge)
  footerData = useStoryblok(footerData, enableBridge)
  useEffect(() => {
    setRecipeList(firstPageRecipeList) // When the dynamic route change reset the state
  }, [dynamicRoute])
  async function displayNewPageItem(activePage) {
    let param = {starts_with: 'recipe/', is_startpage: 0, per_page: 10, page: activePage}
    if (categoryUuid) {
      param['filter_query[categories][exists]'] = categoryUuid
    }

    let {data} = await Storyblok.get(`cdn/stories`, param)
    console.log(data.stories)
    setRecipeList(data ? data.stories : [])
  }
  return (
    <Layout
      navigationBlok={navigationData.content}
      footerBlok={footerData.content}
      logo={logo}
      whatsapp={whatsapp}
    >
      <div className="px-5 md:px-10 py-40  | container | mx-auto">
        <h1 className="text-5xl capitalize font-medium |  my-10">
          {categoryTitle ? categoryTitle : story.content.title}
        </h1>
        <div className="mb-14 | lg:flex gap-10">
          <div className="flex-grow">
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

            <Pagination
              totalPage={totalPage}
              listReset={false}
              displayNewPageItem={displayNewPageItem}
            />
          </div>
          {categories.stories.length > 0 ? <Categories blok={categories.stories} /> : ''}
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
