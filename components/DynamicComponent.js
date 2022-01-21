import Teaser from './Teaser'
// import Feature from "./Feature";
// import FeaturedPosts from "./FeaturedPosts";
import Grid from './Grid'
import Placeholder from './Placeholder'
import PostList from './PostList'
import BlogCard from './BlogCard'
import BlogPost from './BlogPost'
import Post from './Post'
import Page from './Page'
import Hero from './Hero'
import HomeSection from './HomeSection'
import FeaturedProducts from './FeaturedProducts'
import FeaturedRecipes from './FeaturedRecipes'

const Components = {
  Page,
  Teaser,
  Grid,
  BlogCard,
  Post,
  PostList,
  Hero,
  HomeSection,
  FeaturedRecipes,
  FeaturedProducts,
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
