'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MarketSchema extends Schema {
  up () {
    this.create('markets', (table) => {
      table.increments()
      table.string('name', 100).notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('markets')
  }
}

module.exports = MarketSchema
