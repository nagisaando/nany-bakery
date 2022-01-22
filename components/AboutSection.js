const AboutSection = ({blok}) => (
  <section className="bg-darkPink | mt-20">
    <div className="px-5 md:px-10 py-20 | container mx-auto | sm:flex">
      <div className="w-full h-98 sm:w-1/2 |  mx-auto sm:px-5 md:px-8 lg:px-20 | flex-shrink-0">
        <img
          className="content object-cover object-center | mx-auto | h-full"
          src="https://images.unsplash.com/photo-1565608087341-404b25492fee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
        />
      </div>
      <div className="mt-10 sm:mt-0 | flex flex-col justify-center | text-white">
        <h2 className="text-3xl md:text-4xl">Lorem ipsum dolor</h2>
        <p className="text-base font-light mt-10 mb-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore e
        </p>
        <div className="cursor-pointer py-5">
          <a
            className="px-8 py-5 bg- capitalize | transition-opacity duration-200 ease-in hover:opacity-80"
            style={{
              background: '#fff',
              color: '#d38081',
            }}
          >
            contact
          </a>
        </div>
      </div>
    </div>
  </section>
)

export default AboutSection
