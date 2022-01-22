import Link from 'next/link'
const ProductCard = ({blok}) => (
  <Link href={`/${blok.full_slug}`}>
    <a className="px-6 text-center">
      <div className="square">
        <img
          className="content object-cover object-center"
          src={`${
            blok.content.card_image ? blok.content.card_image : blok.content.images[0].filename
          }/m/`}
          alt={blok.content.name}
        />
      </div>
      <h3 className="font-medium text-xl lg:text-2xl capitalize | mt-10 | pt-100%">
        {blok.content.name}
      </h3>
      <p className="mt-1 font-normal">${blok.content.price}</p>
      {blok.content.short_description ? (
        <p className="font-light text-sm mt-1">{blok.content.short_description}</p>
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
      `}</style>
    </a>
  </Link>
)

export default ProductCard
