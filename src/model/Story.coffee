'use strict'

_ = require 'lodash'
moment = require 'moment'
{app: {lang}} = require '../core/helpers/configure-helper'

model = require '../core/database'
story = model 'story', require '../core/database/schemas/stories'
character = model 'character', require '../core/database/schemas/character'
characterLocale = model 'characterLocale',
  require '../core/database/schemas/characterLocale'
mark = model 'mark', require '../core/database/schemas/mark'
markLocale = model 'markLocale', require '../core/database/schemas/markLocale'

character.hasMany characterLocale,
  as: 'locale'
  foreignKey: 'character_id'

mark.hasMany markLocale,
  as: 'locale'
  foreignKey: 'mark_id'

class Story
  getCharacters: ->
    yield character.findAll
      raw: yes
      include: [
        as: 'locale'
        model: characterLocale
        attributes: [
          'name'
        ]
      ]

  getCharactersByName: (name) ->
    yield character.findAll
      raw: yes
      include: [
        as: 'locale'
        model: characterLocale
        attributes: [
          'name'
        ]
        where:
          name:
            $like: "%#{decodeURI name}%"
      ]

  getMarks: ->
    yield mark.findAll
      raw: yes
      include: [
        as: 'locale'
        model: markLocale
        attributes: [
          'name'
        ]
      ]

  getMarkByName: (name) ->
    yield mark.findAll
      raw: yes
      include: [
        as: 'locale'
        model: markLocale
        attributes: [
          'name'
        ]
        where:
          name:
            $like: "%#{decodeURI name}%"
      ]

module.exports = new Story