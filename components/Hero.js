import {sbEditable} from '@storyblok/storyblok-editable'
import ButtonLinkNormal from './ButtonLinkNormal'
const Hero = ({blok}) => (
  <div
    className="h-screen bg-cover | flex flex-col justify-center items-center"
    style={{backgroundImage: `url('${blok.image}/m/')`}}
  >
    <h1 {...sbEditable(blok)} className="text-4xl md:text-6xl text-white font-bold | mb-7">
      {blok.title}
    </h1>

    <div className="mt-3">
      <ButtonLinkNormal blok={blok.body[0]} />
    </div>
  </div>
)

export default Hero
