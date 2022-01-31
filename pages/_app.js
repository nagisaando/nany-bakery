import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import NextNProgress from 'nextjs-progressbar'
function MyApp({Component, pageProps}) {
  return (
    <>
      <NextNProgress color="#d38081" />
      <Component className="font-body" {...pageProps} />
    </>
  )
}

export default MyApp
