import React from 'react'
import Image from 'next/image'
const ProfileForRecipePage = ({blok}) => {
  return (
    <div className="flex-shrink-0 w-full lg:w-72 | mx-auto lg:mx-0 mt-32 lg:mt-0 ">
      <div className="relative h-80 w-80 mx-auto lg:hidden">
        <Image
          src={`http:${blok.image}/m/300x300`}
          alt={'profile-picture'}
          layout="fill"
          objectFit="cover"
          className="rounded-full mx-auto"
        />
      </div>
      <div className="relative h-52 w-52 mx-auto hidden lg:block">
        <Image
          src={`http:${blok.image}/m/200x200`}
          alt={'profile-picture'}
          layout="fill"
          objectFit="cover"
          className="rounded-full mx-auto"
        />
      </div>
      <p className="mt-10 text-center text-lg">{blok.title}</p>
      <p className="font-light opacity-80 | mt-4 text-center">{blok.text}</p>
    </div>
  )
}

export default ProfileForRecipePage
