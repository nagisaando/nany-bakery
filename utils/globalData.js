import Storyblok from './storyblok'

export async function getGlobalData(preview) {
  let sbParams = {
    version: 'published',
  }

  if (preview) {
    sbParams.version = 'draft'
    sbParams.cv = Date.now()
  }
  let navigationData = await Storyblok.get(`cdn/stories/navigation`, sbParams)
  let footerData = await Storyblok.get(`cdn/stories/footer`, sbParams)
  let globalItem = await Storyblok.get(`cdn/stories/global-item`, sbParams)
  return {
    navigationData: navigationData.data ? navigationData.data.story : false,
    footerData: footerData.data ? footerData.data.story : false,
    logo: globalItem.data ? globalItem.data.story.content.logo : false,
    whatsapp: globalItem.data ? globalItem.data.story.content.link_list[0] : false,
  }
}
