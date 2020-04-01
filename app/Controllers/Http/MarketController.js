'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Database = use('Database')

/**
 * Resourceful controller for interacting with products
 */
class MarketController 
{
  /**
   * Show a list of all supermarkets.
   * GET supermarkets
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async getAll ({ request, response }) 
  {
    response.send(await Database.select('*').from('markets'))
  }

  /**
   * Display a single supermarket.
   * GET supermarkets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async get ({ params, request, response }) 
  {
    response.send(await Database.select('*').from('markets').where(params))
  }

  /**
   * Create/save a new supermarket.
   * POST supermarkets
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async post ({ request, response }) 
  {
    response.send(await Database.table('markets').insert(request.body))
  }

  /**
   * Update supermarket details.
   * PUT or PATCH supermarkets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async put ({ params, request, response }) 
  {
    response.send(await Database.table('markets').where(params).update(request.body))
  }

  /**
   * Delete a supermarket with id.
   * DELETE supermarkets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async delete ({ params, request, response }) 
  {
    response.send(await Database.table('markets').where(params).delete())
  }
}

module.exports = MarketController
