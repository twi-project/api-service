import TUserInput from "graphql/input/user/TUserInput"

import TUser from "graphql/type/user/TUser"

import createUser from "graphql/resolve/mutation/user/createUser"

const resolve = {
  type: TUser,
  required: true,
  handler: createUser,
  description: (
    "This method will create a new user using basic information."
  )
}

const user = {
  type: TUserInput,
  required: true
}

const args = {user}

export {resolve, args}