import Storyblok, {useStoryblok} from './storyblok'

export async function getrecipeListPageData(preview, uuid) {
  let sbParams = {
    version: 'draft', // or "published"
  }

  if (preview) {
    sbParams.version = 'draft'
    sbParams.cv = Date.now()
  }
  let recipeListParam = {starts_with: 'recipe/', is_startpage: 0}
  if (uuid) {
    recipeListParam['filter_query[categories][exists]'] = uuid
  }
  let {data} = await Storyblok.get(`cdn/stories/recipe`)
  let categories = await Storyblok.get(`cdn/stories`, {starts_with: 'recipe-categories/'})
  let recipeList = await Storyblok.get(`cdn/stories`, recipeListParam)
  console.log(recipeList)
  let navigationData = await Storyblok.get(`cdn/stories/navigation`, sbParams)
  let footerData = await Storyblok.get(`cdn/stories/footer`, sbParams)

  return {
    story: data ? data.story : false,
    categories: categories.data ? categories.data : false,
    recipeList: recipeList.data ? recipeList.data.stories : false,
    navigationData: navigationData.data ? navigationData.data.story : false,
    footerData: footerData.data ? footerData.data.story : false,
  }
}
