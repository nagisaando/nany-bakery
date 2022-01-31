import Storyblok, {useStoryblok} from './storyblok'

export async function getRecipeListPageData(preview, categoryUuid) {
  let sbParams = {
    version: 'published',
  }

  if (preview) {
    sbParams.version = 'draft'
    sbParams.cv = Date.now()
  }
  let recipeListParam = {starts_with: 'recipe/', is_startpage: 0, per_page: 1, page: 1}
  if (categoryUuid) {
    recipeListParam['filter_query[categories][exists]'] = categoryUuid
  }
  let {data} = await Storyblok.get(`cdn/stories/recipe`)
  let categories = await Storyblok.get(`cdn/stories`, {starts_with: 'recipe-categories/'})
  let recipeList = await Storyblok.get(`cdn/stories`, recipeListParam)

  return {
    story: data ? data.story : false,
    categories: categories.data ? categories.data : false,
    recipeList: recipeList.data ? recipeList.data.stories : false,
    totalPage: recipeList.headers.total,
  }
}
