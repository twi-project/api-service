import moment from "moment"

/**
 * Get schema of this model
 *
 * @param object type
 *
 * @return object
 *
 * @static
 */
const getModelFields = ({TString, TNumber, TDate}, {roles, statuses}) => ({
  login: {
    type: TString,
    unique: true,
    required: [true, "Login is required for user."],
    validate: {
      validator: val => /^[a-z0-9-_.]+$/i.test(val),
      message: (
        "User login have unnesessary format: Allowed only " +
        "alphabetic characters, numbers and - _ . symbols."
      )
    }
  },
  email: {
    type: TString,
    unique: true,
    required: [true, "Required an email for user"]
  },
  password: {
    type: TString,
    required: [true, "Password required for user"]
  },
  status: {
    type: TNumber,
    default: statuses.unactivated
  },
  role: {
    type: TNumber,
    default: roles.user
  },
  registeredAt: {
    type: TDate,
    default: moment
  },
  avatar: {
    type: TString,
    default: null
  },
  contacts: {
    type: {
      vk: TString,
      fb: TString,
      twitter: TString
    },
    default: {
      vk: null,
      fb: null,
      twitter: null
    }
  }
})

export default getModelFields
