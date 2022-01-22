import Link from 'next/link'
const RecipeCard = ({blok}) => (
  <Link href={`/${blok.full_slug}`}>
    <a className="px-6 text-left">
      <div className="square">
        <img
          className="content object-cover object-center"
          src={`${blok.content.card_image ? blok.content.card_image : blok.content.image}/m/`}
          alt={blok.content.title}
        />
      </div>
      <h3 className="font-medium text-lg lg:text-xl capitalize | mt-10 | pt-100%">
        {blok.content.title}
      </h3>
      {blok.content.intro ? <p className="font-light text-sm mt-1">{blok.content.intro}</p> : ''}
      <style jsx>{`
        .square {
          float: left;
          position: relative;
          width: 100%;
          padding-bottom: 100%;
          overflow: hidden;
        }

        .content {
          position: absolute;
          height: 100%;
          width: 100%;
        }
      `}</style>
    </a>
  </Link>
)

export default RecipeCard
