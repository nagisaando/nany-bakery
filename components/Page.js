import DynamicComponent from './DynamicComponent'
import SbEditable from 'storyblok-react'

const Page = ({blok, whatsapp}) => (
  <SbEditable content={blok}>
    <main>
      {blok.body
        ? blok.body.map((blok) => {
            return <DynamicComponent blok={blok} key={blok._uid} whatsapp={whatsapp} />
          })
        : null}
    </main>
  </SbEditable>
)

export default Page
