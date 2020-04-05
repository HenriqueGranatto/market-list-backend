'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Database = use('Database')

/**
 * Resourceful controller for interacting with products
 */
class ProductController 
{
  /**
   * Show a list of all products.
   * GET products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async getAll ({ request, response }) 
  {
    response.send(await Database.select('products.id as productID', 'products.name as productName', 'categories.id as categoryID', 'categories.name as categoryName').from('products').innerJoin('categories', 'products.category', 'categories.id').orderBy('products.name', 'asc'))
  }

  /**
   * Display a single product.
   * GET product/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async get ({ params, request, response }) 
  {
    response.send(await Database.select('*').from('products').where(params))
  }

  /**
   * Create/save a new product.
   * POST product
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async post ({ request, response }) 
  {
    response.send(await Database.table('products').insert(request.body))
  }

  /**
   * Update products details.
   * PUT or PATCH product/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async put ({ params, request, response }) 
  {
    response.send(await Database.table('products').where(params).update(request.body))
  }

  /**
   * Delete a product with id.
   * DELETE product/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async delete ({ params, request, response }) 
  {
    response.send(await Database.table('products').where(params).delete())
  }
}

module.exports = ProductController
