import {sbEditable} from '@storyblok/storyblok-editable'
import ButtonLinkNormal from './ButtonLinkNormal'
import Image from 'next/image'
const Hero = ({blok}) => (
  <div
    className="h-screen bg-cover | flex flex-col justify-center items-center relative"
    // style={{backgroundImage: `url('${blok.image}/m/')`}}
  >
    <div className="absolute h-full w-full -z-10">
      <div className="relative h-full w-full">
        <Image
          className=""
          src={`http:${blok.image}/m/`}
          objectFit="cover"
          layout="fill"
          alt="hero"
          priority={true}
        />
      </div>
    </div>
    <h1 {...sbEditable(blok)} className="text-4xl md:text-6xl text-white font-bold | mb-7">
      {blok.title}
    </h1>

    <div className="mt-3">
      <ButtonLinkNormal blok={blok.body[0]} />
    </div>
  </div>
)

export default Hero
