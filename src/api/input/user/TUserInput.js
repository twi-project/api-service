import {GraphQLEmail as TEmail} from "graphql-custom-types"
import {GraphQLString as TString} from "graphql"

import Input from "parasprite/Input"

import TLogin from "api/scalar/user/TLogin"

import TFileInput from "api/input/common/TFileInput"
import TContactsInput from "api/input/user/TContactsInput"

const TUserInput = Input("UserInput", "Basic user information.")
  .field({
    name: "login",
    type: TLogin,
    description: "An unique human-readable user identifier.",
    required: true
  })
  .field({
    name: "email",
    type: TEmail,
    description: "An email address.",
    required: true
  })
  .field({
    name: "password",
    type: TString,
    description: "User secured (or not :D) password.",
    required: true
  })
  .field({
    name: "avatar",
    type: TFileInput,
    description: "User profile picture."
  })
  .field({
    name: "contacts",
    type: TContactsInput,
    description: "User contact information."
  })
.end()

export default TUserInput
