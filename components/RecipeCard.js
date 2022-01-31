import Link from 'next/link'
import Image from 'next/image'
const RecipeCard = ({blok}) => {
  const date = () => {
    if (blok.content.date) {
      let arr = blok.content.date.split('')
      const index = arr.indexOf(' ')
      // remove time display
      arr.splice(index)
      const year = arr.splice(0, 4)
      // remove / in the beggining
      arr.shift()
      arr.push('-')
      const reorderedArr = arr.concat(year)
      const date = reorderedArr.join('').replace(/-/g, '/')
      return date
    } else {
      return ''
    }
  }
  return (
    <Link href={`/${blok.full_slug}`}>
      <a className="text-left">
        <div className="square">
          <Image
            src={`http:${
              blok.content.card_image ? blok.content.card_image : blok.content.image
            }/m/fit-in/600x600`}
            alt={blok.content.title}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <p className="mt-10 | pt-100% | font-light text-sm">{blok.content.date ? date() : ''}</p>
        <h3
          className={`font-medium text-xl lg:text-2xl capitalize ${
            blok.content.date ? 'mt-1' : 'mt-5'
          }`}
        >
          {blok.content.title}
        </h3>
        {blok.content.intro ? (
          <p className="font-light text-sm mt-1 ellipsis">{blok.content.intro}</p>
        ) : (
          ''
        )}
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
          .ellipsis {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            max-height: 7rem;
          }
        `}</style>
      </a>
    </Link>
  )
}

export default RecipeCard
