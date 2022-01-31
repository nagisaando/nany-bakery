import Head from '../components/Head'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import {motion} from 'framer-motion'
import {useRouter} from 'next/router'

const Layout = ({children, navigationBlok, footerBlok, logo, whatsapp}) => {
  const router = useRouter()
  return (
    // <motion.div
    //   key={router.route}
    //   initial="initial"
    //   animate="animate"
    //   variants={{
    //     initial: {
    //       opacity: 0,
    //     },
    //     animate: {
    //       opacity: 1,
    //     },
    //   }}
    // >
    <div className="">
      <Head />
      <Navigation blok={navigationBlok} logo={logo} whatsapp={whatsapp} />
      {children}
      <Footer blok={footerBlok} logo={logo} whatsapp={whatsapp} />
    </div>
    // </motion.div>
  )
}

export default Layout
