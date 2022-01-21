import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faYoutube, faInstagram} from '@fortawesome/free-brands-svg-icons'
const Footer = ({blok}) => {
  return (
    <footer className="py-6 lg:py-10 bg-pink">
      <div className="container md:flex justify-between | mx-auto | px-5 md:px-10">
        <div>
          <img
            src={`${blok.body[1].image}/m/fit-in/70x70/`}
            alt={blok.body[1].alt_name}
            className=""
          />
        </div>
        <ul className="mt-8 md:mt-0 | flex gap-x-5">
          <li className="">
            <a href={blok.body[0].link_list[0].link.url} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} size="lg" style={{color: 'white'}} />
            </a>
          </li>

          <li className="">
            <a href={blok.body[0].link_list[1].link.url} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faYoutube} size="lg" style={{color: 'white'}} />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
