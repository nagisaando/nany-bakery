import SbEditable from 'storyblok-react'
import ProductCard from './ProductCard'
const FeaturedProducts = ({blok}) => (
  <SbEditable content={blok}>
    <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-16 | mt-24 mb-14">
      {blok.items.map((nestedBlok, i) => {
        return (
          <li key={nestedBlok.uuid} className="">
            <ProductCard blok={nestedBlok} />
          </li>
        )
      })}
    </ul>
  </SbEditable>
)

export default FeaturedProducts
