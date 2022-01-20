import Head from '../components/Head'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

const Layout = ({children, navigationBlok, footerBlok}) => (
  <div className="bg-gray-300">
    <Head />
    <Navigation blok={navigationBlok} />
    {children}
    <Footer blok={footerBlok} />
  </div>
)

export default Layout
