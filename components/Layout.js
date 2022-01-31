import Head from '../components/Head'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import {motion} from 'framer-motion'
import {useRouter} from 'next/router'
import React, {useState, useEffect} from 'react'

const Layout = ({children, navigationBlok, footerBlok, logo, whatsapp}) => {
  const router = useRouter()
  return (
    <div className="">
      <Head />
      <Navigation blok={navigationBlok} logo={logo} whatsapp={whatsapp} />
      <motion.div
        key={router.asPath}
        initial="initial"
        animate="animate"
        transition={{duration: 0.9}}
        variants={{
          initial: {
            opacity: 0,
          },
          animate: {
            opacity: 1,
          },
        }}
        exit={{opacity: 0}}
      >
        {children}
      </motion.div>
      <Footer blok={footerBlok} logo={logo} whatsapp={whatsapp} />
    </div>
  )
}

export default Layout
