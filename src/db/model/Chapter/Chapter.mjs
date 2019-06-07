import isPlainObject from "lodash/isPlainObject"
import invariant from "@octetstream/invariant"
import isString from "lodash/isString"
import Markdown from "markdown-it"

import {createModel, Model} from "core/db"

import getType from "core/helper/util/getType"

import schema from "./schema"

const isArray = Array.isArray

// TODO: Replace with remark
const md = new Markdown({breaks: true})

@createModel(schema)
class Chapter extends Model {
  /**
   * Create a new chapter at exiting story
   *
   * @param {string} story – an ID of exiting story
   * @param {object} chapter
   *
   * @return {object}
   */
  static async createOne(chapter, options) {
    invariant(
      !chapter, TypeError, "Chapter is required. Received %s", getType(chapter)
    )

    invariant(
      !isPlainObject(chapter), TypeError,
      "Chapter should be a plain object. Received %s", getType(chapter)
    )

    invariant(
      !isString(chapter.text), TypeError,
      "Chapter text should be a string. Received %", getType(chapter.text)
    )

    // TODO: Move content storage to a static server
    const content = {
      original: chapter.text,
      rendered: md.render(chapter.text)
    }

    return super.createOne({...chapter, content}, options)
  }

  static async createMany(chapters, options = {}) {
    if (!isArray(chapters)) {
      chapters = [chapters]
    }

    // TODO: Move chapters serving to files.
    for (const [idx, chapter] of chapters.entries()) {
      chapters[idx].content = {
        original: chapter.text,
        rendered: await md.render(chapter.text)
      }
    }

    return super.createMany(chapters, options)
  }
}

export default Chapter