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

const Components = {
  Page,
  Teaser,
  Grid,
  BlogCard,
  Post,
  PostList,
  Hero,
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
