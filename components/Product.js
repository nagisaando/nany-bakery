import React from 'react'
import {sbEditable} from '@storyblok/storyblok-editable'
import {render} from 'storyblok-rich-text-react-renderer'
import LongButtonLink from './LongButtonLink'
import BreadCrumb from './BreadCrumb'
import Link from 'next/link'
import FeaturedProducts from './FeaturedProducts'

const Post = ({blok, relatedProduct}) => {
  return (
    <div {...sbEditable(blok)} className="my-44 | px-5 md:px-10 | container mx-auto">
      <BreadCrumb />
      <div>
        <div className="sm:flex">
          <div className="basis-1/2 sm:pr-8 lg:pr-14">
            <img
              className="content object-cover object-center | mx-auto | h-full sm:h-auto"
              src={`${blok.images[0].filename}/m/`}
            />
          </div>

          <div className="basis-1/2 | mt-16 sm:mt-0">
            <h1 className="font-medium text-3xl md:text-4xl capitalize">{blok.name}</h1>
            {blok.categories && blok.categories.length > 0 ? (
              <div className="text-sm font-light my-4">
                Categories:{' '}
                {blok.categories.map((category, i) => {
                  return (
                    <span key={category.uuid}>
                      <Link href={`/shop/category/${category.slug}`}>
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
            <p className="my-6 | font-medium text-lg md:text-xl">${blok.price}</p>

            <div className="mb-10 content prose max-w-none">{render(blok.description)}</div>
            <LongButtonLink />
          </div>
        </div>
        {relatedProduct.length > 0 ? (
          <div>
            <h2 className="text-4xl | mt-32 -mb-10">You may also like</h2>
            <FeaturedProducts blok={relatedProduct} />
          </div>
        ) : (
          ''
        )}
      </div>
      <style jsx>
        {`
          .content p {
            font-size: 30px;
          }
          a {
            @apply underline;
          }
        `}
      </style>
    </div>
  )
}

export default Post
