import SbEditable from 'storyblok-react'
import ProductCard from './ProductCard'
const FeaturedProducts = ({blok}) => (
  <SbEditable content={blok}>
    <ul className="flex py-8 px-4 mb-6 container mx-auto">
      {blok.items.map((nestedBlok, i) => {
        return (
          <li key={nestedBlok.uuid} className="flex-auto px-6">
            <ProductCard blok={nestedBlok} />
          </li>
        )
      })}
    </ul>
  </SbEditable>
)

export default FeaturedProducts
