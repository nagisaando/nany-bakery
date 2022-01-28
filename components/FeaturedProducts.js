import SbEditable from 'storyblok-react'
import ProductCard from './ProductCard'
const FeaturedProducts = ({blok}) => {
  const blokItem = blok.items ? blok.items : blok
  return (
    <SbEditable content={blok}>
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-16 | mt-24 mb-14">
        {blokItem.map((nestedBlok, i) => {
          return (
            <li key={nestedBlok.uuid} className="">
              <ProductCard blok={nestedBlok} />
            </li>
          )
        })}
      </ul>
    </SbEditable>
  )
}

export default FeaturedProducts
