import {Op as op} from "sequelize"

import getPageInfo from "lib/helper/graphql/getPageInfo"
import bind from "lib/helper/graphql/normalizeParams"
import toPage from "lib/helper/graphql/toPage"

import User from "model/User"
import File from "model/File"
import Contacts from "model/Contacts"

const attributes = {exclude: ["password"]}
const where = {status: {[op.ne]: User.statuses.inactive}}

const include = [
  {
    model: Contacts,
    as: "contacts"
  },
  {
    model: File,
    as: "avatar"
  }
]

function getUsers({args}) {
  const pageInfo = getPageInfo(args)

  return User.findAndCountAll({...pageInfo, include, where, attributes})
    .then(toPage(pageInfo))
}

export default getUsers |> bind
