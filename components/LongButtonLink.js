import {sbEditable} from '@storyblok/storyblok-editable'
import Link from 'next/link'
import SbEditable from 'storyblok-react'
const LongButtonLink = () => (
  <Link href={`/`}>
    <a
      className="px-8 py-5 | block capitalize | transition-opacity duration-200 ease-in hover:opacity-80 | text-center"
      style={{
        background: '#d38081',
        color: '#fff',
      }}
    >
      check availability
      {/* {blok.title} */}
    </a>
  </Link>
)

export default LongButtonLink
