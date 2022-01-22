import Teaser from './Teaser'
// import Feature from "./Feature";
// import FeaturedPosts from "./FeaturedPosts";
import Grid from './Grid'
import Placeholder from './Placeholder'
import PostList from './PostList'
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
  Grid,
  Hero,
  HomeSection,
  FeaturedRecipes,
  FeaturedProducts,
  ImageSection,
  AboutSection,
}

const DynamicComponent = ({blok}) => {
  if (typeof Components[blok.component] !== 'undefined') {
    const Component = Components[blok.component]
    return (
      <div>
        <Component blok={blok} />
      </div>
    )
  }
  return <Placeholder componentName={blok.component} />
}

export default DynamicComponent
