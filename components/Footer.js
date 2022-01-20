const Footer = ({blok}) => {
  return (
    <footer className="py-6 lg:py-10">
      <div className="container md:flex | mx-auto | px-5 md:px-10">
        <div>
          <img
            src={`${blok.body[1].image}/m/fit-in/70x70/`}
            alt={blok.body[1].alt_name}
            className=""
          />
        </div>
        <ul></ul>
      </div>
    </footer>
  )
}

export default Footer
