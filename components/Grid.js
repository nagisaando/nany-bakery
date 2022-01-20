import DynamicComponent from './DynamicComponent'
// import {sbEditable} from '@storyblok/storyblok-editable'
import SbEditable from 'storyblok-react'
const Grid = ({blok}) => (
  <SbEditable content={blok}>
    <ul className="flex py-8 px-4 mb-6 container mx-auto">
      {blok.columns.map((nestedBlok) => (
        <li key={nestedBlok._uid} className="flex-auto px-6">
          <DynamicComponent blok={nestedBlok} />
        </li>
      ))}
    </ul>
  </SbEditable>
)

export default Grid
