import bind from "core/helper/graphql/bindResolver"
import auth from "core/auth/checkUser"

import NotFound from "core/error/http/NotFound"
import Forbidden from "core/error/http/Forbidden"

import getCommonAbilities from "acl/common"
import getStoryAbilities from "acl/story"

import Story from "db/model/Story"

async function update({args, ctx}) {
  const viewer = ctx.state.user

  const aclStory = getStoryAbilities(viewer)
  const aclCommon = getCommonAbilities(viewer)

  const story = await Story.findById(args.storyId)

  if (!story) {
    throw new NotFound("Can't find requested story.")
  }

  if (aclStory.cannot("delete", story) || aclCommon.cannot("delete", story)) {
    throw new Forbidden("You can't delete the story.")
  }

  return story.remove().then(() => args.storyId)
}

export default update |> auth |> bind