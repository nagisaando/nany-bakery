import DynamicComponent from './DynamicComponent'
import SbEditable from 'storyblok-react'
import Image from 'next/image'
const ImageSection = ({blok}) => (
  <SbEditable content={blok}>
    <section className="h-screen w-full | relative">
      <Image
        className=""
        src={`http:${blok.image}/m/`}
        objectFit="cover"
        layout="fill"
        alt="image"
      />
    </section>
  </SbEditable>
)

export default ImageSection
