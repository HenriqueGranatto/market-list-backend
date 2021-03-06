'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ListSchema extends Schema {
  up () {
    this.create('lists', (table) => {
      table.increments()
      table.string('checked', 10).notNullable()
      table.integer('product').notNullable()
      table.integer('market').notNullable()
      table.float('price').notNullable()
      table.integer('amount').notNullable()
      table.float('weighing').notNullable()
      table.string('weight', 10).notNullable()
      table.integer('category').notNullable()
      table.integer('priority').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('lists')
  }
}

module.exports = ListSchema
