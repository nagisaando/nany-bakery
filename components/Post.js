import React from 'react'
import {sbEditable} from '@storyblok/storyblok-editable'
import {render} from 'storyblok-rich-text-react-renderer'
import Link from 'next/link'
import RecipeDetailCard from './RecipeDetailCard'
import FeaturedRecipes from './FeaturedRecipes'
import Image from 'next/image'
const Post = ({blok, relatedRecipe}) => {
  const date = () => {
    if (blok.date) {
      let arr = blok.date.split('')
      const index = arr.indexOf(' ')
      // remove time display
      arr.splice(index)
      const year = arr.splice(0, 4)
      // remove / in the beggining
      arr.shift()
      arr.push('-')
      const reorderedArr = arr.concat(year)
      const date = reorderedArr.join('').replace(/-/g, '/')
      return date
    } else {
      return ''
    }
  }
  return (
    <div {...sbEditable(blok)} className="flex-grow">
      <div>
        <h1 className="text-5xl font-medium capitalize">{blok.title}</h1>
        {blok.categories && blok.categories.length > 0 ? (
          <div className="text-sm font-light my-4">
            Categories:{' '}
            {blok.categories.map((category, i) => {
              return (
                <span key={category.uuid}>
                  <Link href={`/recipe/category/${category.slug}`}>
                    <a>{category.content.name}</a>
                  </Link>
                  {i !== blok.categories.length - 1 ? ', ' : ''}
                </span>
              )
            })}
          </div>
        ) : (
          ''
        )}

        <p className="text-sm font-light my-5">{date()}</p>
        <div className="img-container w-full h-120 | relative">
          <Image
            className="image"
            src={`http:${blok.image}/m/`}
            alt={blok.title}
            layout="fill"
            objectFit="contain"
            objectPosition="left top"
            priority={true}
          />
        </div>
        <div className="mt-20 prose max-w-none">{render(blok.long_text)}</div>
        {blok.recipe_description.length > 0 ? (
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
      {relatedRecipe.length > 0 ? (
        <div>
          <h2 className="text-4xl | mt-32 -mb-10">You may also like</h2>
          <FeaturedRecipes blok={relatedRecipe} />
        </div>
      ) : (
        ''
      )}
      <style jsx>{`
        .image {
          object-fit: contain;
          width: 100% !important;
          position: relative !important;
          height: unset !important;
        }
      `}</style>
    </div>
  )
}

export default Post
