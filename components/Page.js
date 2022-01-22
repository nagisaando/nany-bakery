import DynamicComponent from './DynamicComponent'
import SbEditable from 'storyblok-react'
import AboutSection from './AboutSection'
const Page = ({blok}) => (
  <SbEditable content={blok}>
    <main>
      {blok.body
        ? blok.body.map((blok) => {
            return <DynamicComponent blok={blok} key={blok._uid} />
          })
        : null}
    </main>
    <AboutSection />
  </SbEditable>
)

export default Page
