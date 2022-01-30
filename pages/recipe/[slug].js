import Layout from '../../components/Layout'
import Post from '../../components/Post'
import React, {useEffect} from 'react'
import Storyblok, {useStoryblok} from '../../utils/storyblok'
import {getGlobalData} from '../../utils/globalData'
import ProfileForRecipePage from '../../components/ProfileForRecipePage'
import BreadCrumb from '../../components/BreadCrumb'

import {useRouter} from 'next/router'
export default function Page({
  story,
  profileData,
  navigationData,
  footerData,
  logo,
  whatsapp,
  relatedRecipe,
  preview,
}) {
  const enableBridge = true // load the storyblok bridge everywhere
  const router = useRouter()
  story = useStoryblok(story, enableBridge)
  navigationData = useStoryblok(navigationData, enableBridge)
  footerData = useStoryblok(footerData, enableBridge)

  return (
    <Layout
      navigationBlok={navigationData.content}
      footerBlok={footerData.content}
      logo={logo}
      whatsapp={whatsapp}
    >
      <div className="my-44 | px-5 md:px-10 | container mx-auto">
        <BreadCrumb />
        <div className="lg:flex gap-10">
          <Post blok={story.content} relatedRecipe={relatedRecipe} />
          <ProfileForRecipePage blok={profileData.content} />
        </div>
      </div>
      <style jsx global>{`
        body {
          font-family: 'Poppins', sans-serif;
        }
        a {
          transition: all 100ms ease-in;
        }
        a:hover {
          opacity: 0.6;
        }
      `}</style>
    </Layout>
  )
}

export async function getStaticProps({params, preview = false}) {
  let sbParams = {
    version: 'draft', // or "published"
  }

  if (preview) {
    sbParams.version = 'draft'
    sbParams.cv = Date.now()
  }

  let {data} = await Storyblok.get(`cdn/stories/recipe/${params.slug}`, {
    resolve_relations: ['Post.categories'],
  })
  let profile = await Storyblok.get(`cdn/stories/profile-for-recipe-article`, sbParams)
  let globalData = await getGlobalData(preview)
  let relatedRecipe = []
  if (data && data.story.content.categories && data.story.content.categories.length > 0) {
    relatedRecipe = await Storyblok.get(`cdn/stories/`, {
      starts_with: 'recipe/',
      is_startpage: 0,
      per_page: 4,
      page: 1,
      ['filter_query[categories][exists]']: data.story.content.categories[0].uuid,
    })
  }
  if (relatedRecipe.data) {
    relatedRecipe = relatedRecipe.data.stories
      .filter((el) => {
        return el.uuid !== data.story.uuid
      })
      .slice(0, 3)
  }
  return {
    props: {
      story: data ? data.story : false,
      profileData: profile.data ? profile.data.story : false,
      relatedRecipe: relatedRecipe.length > 0 ? relatedRecipe : [],
      navigationData: globalData.navigationData,
      footerData: globalData.footerData,
      logo: globalData.logo,
      whatsapp: globalData.whatsapp,
      preview,
    },
    revalidate: 3600, // revalidate every hour
  }
}

export async function getStaticPaths({}) {
  let {data} = await Storyblok.get('cdn/links/', {
    starts_with: 'recipe/',
  })

  let paths = []
  Object.keys(data.links).forEach((linkKey) => {
    if (data.links[linkKey].slug === 'recipe/') {
      return
    }

    paths.push({params: {slug: data.links[linkKey].slug.replace('recipe/', '')}})
  })

  console.log(paths)

  return {
    paths: paths,
    fallback: false,
  }
}
