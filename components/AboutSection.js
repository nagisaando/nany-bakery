import {sbEditable} from '@storyblok/storyblok-editable'
import ButtonExternalLink from './ButtonExternalLink'
import Image from 'next/image'
const AboutSection = ({blok, whatsapp}) => (
  <section {...sbEditable(blok)} className="bg-darkPink | mt-20">
    <div className="px-5 md:px-10 py-20 | container mx-auto | sm:flex gap-4">
      <div className="w-full h-98 sm:h-auto lg:h-120 sm:w-1/2 |  mx-auto sm:px-5 md:px-8 lg:px-20 | flex-shrink-0 | relative">
        <Image
          className="mx-auto | w-full h-full object-cover object-center"
          src={`http:${blok.image}/m/fit-in/600x660/`}
          objectFit="contain"
          layout="fill"
        />
      </div>
      <div className="mt-10 sm:mt-0 | flex flex-col justify-center | text-white">
        <h2 className="text-3xl md:text-4xl">{blok.title}</h2>
        <p className="text-base font-light mt-10 mb-10">{blok.text}</p>
        <div className="py-5">
          <ButtonExternalLink blok={blok.body[0]} link={whatsapp} />
        </div>
      </div>
    </div>
  </section>
)

export default AboutSection
