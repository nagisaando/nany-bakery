import {sbEditable} from '@storyblok/storyblok-editable'
import Link from 'next/link'
import SbEditable from 'storyblok-react'
const ButtonLinkNormal = ({blok}) => (
  <div {...sbEditable(blok)}>
    <Link href={`/${blok.link.cached_url}`}>
      <a className="px-8 py-5 bg-white capitalize | transition-opacity duration-200 ease-in hover:opacity-70">
        {blok.title}
      </a>
    </Link>
  </div>
)

export default ButtonLinkNormal
