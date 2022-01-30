import {sbEditable} from '@storyblok/storyblok-editable'
const ButtonExternalLink = ({blok, link}) => (
  <a
    {...sbEditable(blok)}
    className="px-8 py-5 capitalize | transition-opacity duration-200 ease-in hover:opacity-80"
    style={{
      background: blok.color ? blok.color : '#d38081',
      color: blok.text_color ? blok.text_color : '#000',
    }}
    href={link.link.url ? link.link.url : blok.link.url}
    target="_blank"
    rel="noreferrer"
  >
    {blok.title}
  </a>
)

export default ButtonExternalLink
