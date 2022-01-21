import DynamicComponent from './DynamicComponent'
// import {sbEditable} from '@storyblok/storyblok-editable'
import SbEditable from 'storyblok-react'
const FeaturedRecipes = ({blok}) => (
  <SbEditable content={blok}>
    <ul className="flex py-8 px-4 mb-6 container mx-auto">
      {blok.items.map((nestedBlok) => (
        <li key={nestedBlok.uuid} className="flex-auto px-6">
          <div>hi</div>
        </li>
      ))}
    </ul>
  </SbEditable>
)

export default FeaturedRecipes
