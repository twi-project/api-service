import {GraphQLInt as TInt, GraphQLNonNull as Required} from "graphql"

import TUserPage from "api/type/user/TUserPage"

import list from "api/resolve/query/user/list"

/** @type {import("graphql").GraphQLFieldConfig} */
const field = {
  type: new Required(TUserPage),
  description: "Returns a list of available users.",
  resolve: list,
  args: {
    page: {
      type: TInt,
      description: "Page offset"
    }
  }
}

export default field