'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/list',     'ListController.getAll')
Route.get('/market',   'MarketController.getAll')
Route.get('/product',  'ProductController.getAll')
Route.get('/category', 'CategoryController.getAll')

Route.get('/list/:id',     'ListController.get')
Route.get('/market/:id',   'MarketController.get')
Route.get('/product/:id',  'ProductController.get')
Route.get('/category/:id', 'CategoryController.get')

Route.post('/list',     'ListController.post')
Route.post('/market',   'MarketController.post')
Route.post('/product',  'ProductController.post')
Route.post('/category', 'CategoryController.post')

Route.put('/list/:id',     'ListController.put')
Route.put('/market/:id',   'MarketController.put')
Route.put('/product/:id',  'ProductController.put')
Route.put('/category/:id', 'CategoryController.put')

Route.delete('/list/:id',     'ListController.delete')
Route.delete('/market/:id',   'MarketController.delete')
Route.delete('/product/:id',  'ProductController.delete')
Route.delete('/category/:id', 'CategoryController.delete')