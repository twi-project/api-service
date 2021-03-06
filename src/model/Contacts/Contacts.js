import {Model} from "sequelize"

import createModel from "lib/db/createModel"

import schema from "./schema"

@createModel(schema, {timestamps: false})
class Contacts extends Model { }

export default Contacts
