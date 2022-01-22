import DynamicComponent from './DynamicComponent'
import {sbEditable} from '@storyblok/storyblok-editable'
import ButtonLinkNormal from './ButtonLinkNormal'

// import SbEditable from 'storyblok-react'
const HomeSection = ({blok}) => (
  <section className="container mx-auto | py-24 px-5 md:px-10 | text-center">
    {blok.title ? (
      <h2 {...sbEditable(blok)} className="text-3xl md:text-4xl">
        {blok.title}
      </h2>
    ) : (
      ''
    )}
    {blok.sub_titile ? (
      <p {...sbEditable(blok)} className="font-light mt-7">
        {blok.sub_titile}
      </p>
    ) : (
      ''
    )}
    <DynamicComponent blok={blok.body[0]} />
    <ButtonLinkNormal blok={blok.body[1]} />
  </section>
)

export default HomeSection
