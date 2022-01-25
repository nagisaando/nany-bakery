import React from 'react'
import {sbEditable} from '@storyblok/storyblok-editable'
import {render} from 'storyblok-rich-text-react-renderer'

import RecipeDetailCard from './RecipeDetailCard'
import FeaturedRecipes from './FeaturedRecipes'

const Post = ({blok}) => {
  return (
    <div {...sbEditable(blok)} className="">
      <div>
        <h1 className="text-5xl font-medium capitalize">{blok.title}</h1>
        <p className="text-sm font-light my-5">{blok.date}</p>
        <div className="">
          <img className="object-cover object-center " src={`${blok.image}/m/`} alt={blok.title} />
        </div>
        <div className="mt-20 prose max-w-none">{render(blok.long_text)}</div>
        {blok.recipe_description ? (
          <RecipeDetailCard
            blok={blok.recipe_description[0]}
            title={blok.title}
            intro={blok.intro}
            image={blok.image}
          />
        ) : (
          ''
        )}
      </div>
      {blok.related_recipe ? (
        <div>
          <h2 className="text-4xl | mt-32 -mb-10">You may also like</h2>
          <FeaturedRecipes blok={blok.related_recipe} />
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default Post
