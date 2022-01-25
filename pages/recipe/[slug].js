import Layout from '../../components/Layout'
import DynamicComponent from '../../components/DynamicComponent'
import React, {useEffect} from 'react'
import Storyblok, {useStoryblok} from '../../utils/storyblok'
import ProductCard from '../../components/ProductCard'
import ProfileForRecipePage from '../../components/ProfileForRecipePage'
import BreadCrumb from '../../components/BreadCrumb'

import {useRouter} from 'next/router'
export default function Page({
  story,
  recipeList,
  profileData,
  navigationData,
  footerData,
  preview,
}) {
  const enableBridge = true // load the storyblok bridge everywhere
  const router = useRouter()
  const {slug} = router.query
  useEffect(() => {
    async function retrieveObjectData() {
      let sbParams = {
        version: 'draft', // or "published"
        // language: locale,
      }

      const response = await Storyblok.get(`cdn/stories/recipe/${slug}`)
      console.log(response)
    }
    retrieveObjectData()
  }, [])
  story = useStoryblok(story, enableBridge)
  navigationData = useStoryblok(navigationData, enableBridge)
  footerData = useStoryblok(footerData, enableBridge)

  return (
    <Layout navigationBlok={navigationData.content} footerBlok={footerData.content}>
      <div className="my-44 | px-5 md:px-10 | container mx-auto">
        <BreadCrumb />
        <div className="lg:flex gap-10">
          <DynamicComponent blok={story.content} />
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
    resolve_relations: ['Post.related_recipe'],
  })
  //   let {data} = await Storyblok.get(`cdn/stories/home`)
  let recipeList = await Storyblok.get(`cdn/stories`, {starts_with: 'recipe/', is_startpage: 0})
  let profile = await Storyblok.get(`cdn/stories/profile-for-recipe-article`, sbParams)
  let navigationData = await Storyblok.get(`cdn/stories/navigation`, sbParams)
  let footerData = await Storyblok.get(`cdn/stories/footer`, sbParams)

  return {
    props: {
      story: data ? data.story : false,
      recipeList: recipeList.data ? recipeList.data.stories : false,
      profileData: profile.data ? profile.data.story : false,
      navigationData: navigationData.data ? navigationData.data.story : false,
      footerData: footerData.data ? footerData.data.story : false,
      preview,
    },
    revalidate: 3600, // revalidate every hour
  }
}

export async function getStaticPaths({locales}) {
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
