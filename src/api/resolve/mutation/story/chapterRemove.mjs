import bind from "core/helper/graphql/normalizeParams"
import Forbidden from "core/error/http/Forbidden"
import serial from "core/helper/array/runSerial"
import NotFound from "core/error/http/NotFound"
import auth from "core/auth/checkUser"
import conn from "core/db/connection"

import Story from "model/Story"
import Chapter from "model/Chapter"

import getChapterAbilities from "acl/chapter"

const include = [{model: Story, as: "story"}]

const chapterRemove = ({args, ctx}) => conn.transaction(async transaction => {
  const {user} = ctx.state
  const {chapterId} = args

  const chapter = await Chapter.findByPk(chapterId, {include, transaction})

  if (!chapter) {
    throw new NotFound("Cannot find requested chapter.")
  }

  const acl = getChapterAbilities({user})

  if (acl.cannot("delete", chapter)) {
    throw new Forbidden("You cannot add a new chapter.")
  }

  return serial([
    () => chapter.destroy({transaction}),

    () => chapter.Story.decrement("chaptersCount", {transaction}),

    () => chapterId
  ])
})

export default chapterRemove |> auth |> bind
