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
    const convertWeighing = (item) => (item.weight != 'kg' && item.weight != 'L') ? calculateWeighing(item.weighing) : item.weighing

    const calculateWeighing = (itemWeighing) => itemWeighing / 1000 
    const calculateUnitPrice = (item) => item.price / item.weighing

    let items = await Database.raw('select distinct lists.id as id, markets.name as market, markets.id as marketID, products.name as product, products.id as productID, amount, price, weighing, weight from lists, markets, products where lists.product = products.id and lists.market = markets.id')
    items[0].map((obj) => obj.weighing = convertWeighing(obj))
    items[0].map((obj) => obj.unitPrice = `${calculateUnitPrice(obj).toFixed(2)}`)
    items[0].map((obj) => obj.weighing = (obj.weight != 'kg' && obj.weight != 'L') ? obj.weighing * 1000 : obj.weighing)

    let itemsByProduct = items[0].map((obj) => obj.product)
    itemsByProduct = Array.from(new Set(itemsByProduct))

    for (let product of itemsByProduct) 
    {
        product = items[0].filter((obj) => obj.product == product)
        product = product.sort((a, b) => a.unitPrice - b.unitPrice)
        product[0].unitPrice = `*R$ ${product[0].unitPrice}`
        product = product.map((obj, idx) => (idx > 0) ? obj.unitPrice = `R$ ${obj.unitPrice}` : obj.unitPrice)
    }

    response.send(items) 
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
    const convertWeighing = (product) => (product.weight != 'kg' && product.weight != 'L') ? calculateWeighing(product.weighing) : product.weighing
    const calculateWeighing = (product) => product.weighing / 1000 
    const calculateUnitPrice = (product) => product.price / convertWeighing(product.weighing)

    request.body.unitPrice = calculateUnitPrice(request.body)

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

  /**
   * Delete all items of list.
   * DELETE lists/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async deleteAll ({ params, request, response }) 
  {
    response.send(await Database.table('lists').delete())
  }
}

module.exports = ListController
