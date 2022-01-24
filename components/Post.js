import React from 'react'
import {sbEditable} from '@storyblok/storyblok-editable'
import {render} from 'storyblok-rich-text-react-renderer'
import BreadCrumb from './BreadCrumb'
import RecipeDetailCard from './RecipeDetailCard'

const Post = ({blok}) => {
  return (
    <div {...sbEditable(blok)} className="my-44 | px-5 md:px-10 | container mx-auto">
      <BreadCrumb />
      <div>
        <h1 className="text-5xl font-medium capitalize">{blok.title}</h1>
        <p className="text-sm font-light my-5">{blok.date}</p>
        <div className="">
          <img className="object-cover object-center " src={`${blok.image}/m/`} alt={blok.title} />
        </div>
        <div className="mt-20 prose">{render(blok.long_text)}</div>
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
    </div>
  )
}

export default Post
