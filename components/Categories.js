import React from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
const Categories = ({blok}) => {
  const router = useRouter()
  return (
    <div className="">
      <h2 className="text-3xl font-medium capitalize | mt-20 lg:mt-0">categories</h2>
      <ul className="mt-6">
        {blok.map((blok) => (
          <li key={blok.uuid} className="my-2 | capitalize font-light">
            <Link
              href={`${router.pathname.includes('/shop') ? '/shop' : '/recipe'}/category/${
                blok.content.name
              }`}
            >
              {blok.content.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Categories
