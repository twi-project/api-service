import {Model} from "sequelize"

import createModel from "lib/db/createModel"

import schema from "./schema"
import hooks from "./hooks"

@createModel(schema, {hooks, paranoid: true})
class Story extends Model {
  /**
   * @public
   *
   * @type boolean
   */
  get isTranslation() {
    const {originalAuthor, originalTitle, originalUrl} = this

    return Boolean(originalAuthor && originalTitle && originalUrl)
  }

  /**
   * @public
   *
   * @type boolean
   */
  get isRemoved() {
    return Boolean(this.deletedAt)
  }

  /**
   * Check if the Story has given user
   *
   * @public
   * @method
   *
   * @param {import("../User").default} user
   *
   * @return {boolean}
   */
  hasPublisher(user) {
    if (!user) {
      return false
    }

    return this.userId === Number(user.id)
  }
}

export default Story
