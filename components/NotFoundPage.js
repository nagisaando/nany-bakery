import Link from 'next/link'
const NotFoundPage = ({}) => (
  <div className="flex justify-center items-center | container mx-auto | py-20 px-5 md:px-10 | h-screen">
    <div>
      <p className="font-black text-pink text-9xl">404</p>
      <p className="font-bold opacity-90 text-2xl text-center mt-5 ">Page not found...</p>
      <div className="py-5 text-center mt-10">
        <Link href="/">
          <a
            className="px-8 py-5 bg- capitalize | transition-opacity duration-200 ease-in hover:opacity-80"
            style={{
              background: '#d38081',
              color: '#fff',
            }}
          >
            back to home
          </a>
        </Link>
      </div>
    </div>
  </div>
)

export default NotFoundPage
