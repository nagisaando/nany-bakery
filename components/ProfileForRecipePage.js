import React from 'react'

const ProfileForRecipePage = ({blok}) => {
  return (
    <div className="flex-shrink-0 w-full lg:w-72 | mx-auto lg:mx-0 mt-32 lg:mt-0">
      <img
        className="content object-cover object-center | mx-auto | h-full sm:h-auto | rounded-full | lg:hidden"
        src={`${blok.image}/m/300x300`}
      />
      <img
        className="content object-cover object-center | mx-auto | h-full sm:h-auto | rounded-full | hidden lg:block"
        src={`${blok.image}/m/200x200`}
      />
      <p className="mt-10 text-center text-lg">{blok.title}</p>
      <p className="font-light opacity-80 | mt-4 text-center">{blok.text}</p>
    </div>
  )
}

export default ProfileForRecipePage
