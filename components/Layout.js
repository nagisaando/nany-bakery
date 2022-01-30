import Head from '../components/Head'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

const Layout = ({children, navigationBlok, footerBlok, logo, whatsapp}) => (
  <div className="bg-gray-300">
    <Head />
    <Navigation blok={navigationBlok} logo={logo} whatsapp={whatsapp} />
    {children}
    <Footer blok={footerBlok} logo={logo} whatsapp={whatsapp} />
  </div>
)

export default Layout
