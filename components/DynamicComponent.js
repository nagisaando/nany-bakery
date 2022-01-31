// import Feature from "./Feature";
import Placeholder from './Placeholder'
import Product from './Product'
import Post from './Post'
import Page from './Page'
import Hero from './Hero'
import HomeSection from './HomeSection'
import FeaturedProducts from './FeaturedProducts'
import FeaturedRecipes from './FeaturedRecipes'
import ImageSection from './ImageSection'
import AboutSection from './AboutSection'
const Components = {
  Page,
  Hero,
  HomeSection,
  FeaturedRecipes,
  FeaturedProducts,
  ImageSection,
  AboutSection,
  Post,
  Product,
}

const DynamicComponent = ({blok, whatsapp}) => {
  if (typeof Components[blok.component] !== 'undefined') {
    const Component = Components[blok.component]
    return (
      <div>
        <Component blok={blok} whatsapp={whatsapp} />
      </div>
    )
  }
  return <Placeholder componentName={blok.component} />
}

export default DynamicComponent
