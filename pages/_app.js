import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
function MyApp({Component, pageProps}) {
  return <Component className="font-body" {...pageProps} />
}

export default MyApp
