'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Database = use('Database')

/**
 * Resourceful controller for interacting with lists
 */
class ListController 
{
  /**
   * Show a list of all lists.
   * GET lists
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async getAll ({ request, response }) 
  {
    response.send(await Database.select('*').from('lists'))
  }

  /**
   * Display a single list.
   * GET list/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async get ({ params, request, response }) 
  {
    response.send(await Database.select('*').from('lists').where(params))
  }

  /**
   * Create/save a new list.
   * POST list
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async post ({ request, response }) 
  {
    response.send(await Database.table('lists').insert(request.body))
  }

  /**
   * Update lists details.
   * PUT or PATCH list/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async put ({ params, request, response }) 
  {
    response.send(await Database.table('lists').where(params).update(request.body))
  }

  /**
   * Delete a list with id.
   * DELETE lists/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async delete ({ params, request, response }) 
  {
    response.send(await Database.table('lists').where(params).delete())
  }
}

module.exports = ListController
