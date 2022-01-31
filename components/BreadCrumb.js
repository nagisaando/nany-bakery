import React, {useState, useEffect} from 'react'
import {sbEditable} from '@storyblok/storyblok-editable'
import {render} from 'storyblok-rich-text-react-renderer'
import Link from 'next/link'
import {useRouter} from 'next/router'

const BreadCrumb = ({blok}) => {
  const router = useRouter()
  const [path, setPath] = useState(getPath())
  const {slug} = router.query
  function getPath() {
    let path = router.asPath.replace('/', '').split('-').join(' ')
    if (path[path.length - 1] === '/') {
      path = path.slice(0, -1)
    }
    if (path.includes('/')) {
      return path.split('/')
    } else {
      return [path]
    }
  }
  return (
    <p className="capitalize font-light | mb-20">
      <Link href="/">
        <a className="inline-block mr-2.5">home</a>
      </Link>
      {path.map((el, i) => {
        if (i !== path.length - 1) {
          return (
            <span key={i}>
              ›
              <Link
                href={
                  '/' +
                  path
                    .slice(0, i + 1)
                    .toString()
                    .replace(/,/g, '/')
                    .replace(/ /g, '-')
                }
                className={i === path.length - 1 && 'font-medium'}
              >
                <a className="inline-block mx-2.5">{el}</a>
              </Link>
            </span>
          )
        }
      })}
      ›<span className="inline-block mx-2.5">{slug}</span>
    </p>
  )
}

export default BreadCrumb
