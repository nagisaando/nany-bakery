import Storyblok, {useStoryblok} from './storyblok'

export async function getShopListPageData(preview, uuid) {
  let sbParams = {
    version: 'published',
  }

  if (preview) {
    sbParams.version = 'draft'
    sbParams.cv = Date.now()
  }

  let shopListParam = {starts_with: 'shop/', is_startpage: 0, per_page: 10, page: 1}
  if (uuid) {
    shopListParam['filter_query[categories][exists]'] = uuid
  }

  let {data} = await Storyblok.get(`cdn/stories/shop`)
  let categories = await Storyblok.get(`cdn/stories`, {starts_with: 'shop-categories/'})
  let shopList = await Storyblok.get(`cdn/stories`, shopListParam)

  return {
    story: data ? data.story : false,
    categories: categories.data ? categories.data : false,
    shopList: shopList.data ? shopList.data.stories : false,
    totalPage: Math.ceil(shopList.headers.total / 10),
    preview,
  }
}
