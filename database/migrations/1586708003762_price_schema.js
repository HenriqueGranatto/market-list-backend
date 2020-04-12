'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PriceSchema extends Schema {
  up () {
    this.create('prices', (table) => {
      table.increments()
      table.integer('product').notNullable()
      table.integer('market').notNullable()
      table.float('unit_price').notNullable()
      table.float('price').notNullable()
      table.float('weighing').notNullable()
      table.string('weight', 10).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('prices')
  }
}

module.exports = PriceSchema
