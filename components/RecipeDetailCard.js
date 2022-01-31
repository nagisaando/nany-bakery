import React from 'react'
import {sbEditable} from '@storyblok/storyblok-editable'
import {render} from 'storyblok-rich-text-react-renderer'
import Image from 'next/image'
const RecipeDetailCard = ({blok, title, intro, image}) => {
  return (
    <div {...sbEditable(blok)} className="bg-lightPink p-10">
      <div className="sm:flex flex-row-reverse">
        <div className="relative h-64 w-52">
          <Image src={`http:${image}/m/200x250`} alt={title} layout="fill" objectFit="cover" />
        </div>
        <div className="flex-grow | sm:pr-6 | mt-5 sm:mt-0">
          <h2 className="text-4xl capitalize">{title}</h2>
          <p className="text-light mt-6">{intro}</p>
        </div>
      </div>
      <hr className="my-10 bg-gray h-0.25 border-none border-gray" />
      <div className="grid grid-cols-3 | text-center">
        <div>
          <p className="uppercase opacity-60">Prep time</p>
          <p className="mt-2">{blok.prep_time ? blok.prep_time : ''}</p>
        </div>
        <div>
          <p className="uppercase opacity-60">cook time</p>
          <p className="mt-2">{blok.cook_time ? blok.cook_time : ''}</p>
        </div>
        <div>
          <p className="uppercase opacity-60">servings</p>
          <p className="mt-2">{blok.servings ? blok.servings : ''}</p>
        </div>
      </div>
      <div className="flex items-center | my-10">
        <p className="uppercase | mr-5">ingredients</p>
        <hr className="bg-gray h-0.25 border-none border-gray | flex-grow" />
      </div>
      <div className="prose max-w-none">{render(blok.ingredients)}</div>
      <div className="flex items-center | my-10">
        <p className="uppercase | mr-5">instructions</p>
        <hr className="bg-gray h-0.25 border-none border-gray | flex-grow" />
      </div>
      <div className="prose max-w-none">{render(blok.instructions)}</div>
    </div>
  )
}

export default RecipeDetailCard
