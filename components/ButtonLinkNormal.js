import {sbEditable} from '@storyblok/storyblok-editable'
import Link from 'next/link'
import SbEditable from 'storyblok-react'
const ButtonLinkNormal = ({blok}) => (
  <div {...sbEditable(blok)} className="py-5">
    <Link href={`/${blok.link.cached_url}`}>
      <a
        className="px-8 py-5 bg- capitalize | transition-opacity duration-200 ease-in hover:opacity-80"
        style={{
          background: blok.color ? blok.color : '#d38081',
          color: blok.text_color ? blok.text_color : '#000',
        }}
      >
        {blok.title}
      </a>
    </Link>
  </div>
)

export default ButtonLinkNormal
