import DynamicComponent from './DynamicComponent'
import SbEditable from 'storyblok-react'
const ImageSection = ({blok}) => (
  <SbEditable content={blok}>
    <section
      className="h-screen w-full bg-cover | flex flex-col justify-center items-center"
      style={{backgroundImage: `url('${blok.image}')`}}
    ></section>
  </SbEditable>
)

export default ImageSection
