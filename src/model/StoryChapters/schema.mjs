import {DataTypes as t} from "sequelize"

const schema = {
  storyId: {
    type: t.INTEGER.UNSIGNED,
    allowNull: false,
    field: "story_id"
  },
  chapterId: {
    type: t.INTEGER.UNSIGNED,
    allowNull: false,
    field: "chapter_id"
  }
}

export default schema
