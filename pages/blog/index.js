// import React from 'react'
import Layout from '../../components/Layout'
import DynamicComponent from '../../components/DynamicComponent'
import Storyblok, {useStoryblok} from '../../utils/storyblok'
import React, {useEffect} from 'react'
import BlogCard from '../../components/BlogCard'

export default function Page({story, preview, locale, locales, defaultLocale, blogList}) {
  useEffect(() => {
    async function retrieveObjectData() {
      const response = await Storyblok.get(`cdn/stories`, {starts_with: 'blog/', is_startpage: 0})
      console.log(response)
    }
    retrieveObjectData()
  }, [])
  const enableBridge = true // load the storyblok bridge everywhere

  // use the preview variable to enable the bridge only in preview mode
  // const enableBridge = preview;
  story = useStoryblok(story, enableBridge, locale)

  return (
    <Layout locale={locale} locales={locales} defaultLocale={defaultLocale}>
      <div className="flex container mx-auto px-4">
        <div>sidebar</div>
        <ul>
          {blogList.data.stories
            ? blogList.data.stories.map((blok) => <BlogCard blok={blok} key={blok._uid} />)
            : null}
        </ul>
      </div>
    </Layout>
  )
}

export async function getStaticProps({locale, locales, defaultLocale, params, preview = false}) {
  let sbParams = {
    version: 'draft', // or "published"
    resolve_relations: ['featured-posts.posts', 'selected-posts.posts'],
    language: locale,
  }

  if (preview) {
    sbParams.version = 'draft'
    sbParams.cv = Date.now()
  }

  let {data} = await Storyblok.get(`cdn/stories/blog`, sbParams)
  let blogList = await Storyblok.get(`cdn/stories`, {starts_with: 'blog/', is_startpage: 0})
  return {
    props: {
      story: data ? data.story : false,
      blogList: blogList,
      preview,
      locale,
      locales,
      defaultLocale,
    },
    revalidate: 3600, // revalidate every hour
  }
}
