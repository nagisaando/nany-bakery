// import {sbEditable} from '@storyblok/storyblok-editable'
const ProductCard = ({blok}) => (
  <div>
    {blok.content ? (
      <div className="flex-auto px-6">
        <h3 className="font-medium text-lg">{blok.content.name}</h3>
        <p>hiiii</p>
      </div>
    ) : (
      <div></div>
    )}
  </div>
)

export default ProductCard
