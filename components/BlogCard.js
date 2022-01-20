import Link from 'next/link'
import {render} from 'storyblok-rich-text-react-renderer'
const BlogCard = ({blok}) => (
  <Link href={blok.full_slug}>
    <a>
      <p>blog list</p>
      {blok.content.title}
      {render(blok.content.long_text.content[0].content[0].text)}
    </a>
  </Link>
)

export default BlogCard
