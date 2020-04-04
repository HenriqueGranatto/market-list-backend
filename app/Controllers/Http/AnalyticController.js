'use strict'

const Database = use('Database')

class AnalyticController 
{
    async getAll ({ request, response }) 
    {
        let analyze = {totalItems: 0, totalBetterPrice: 0, totalBetterMarkets: 0, totalMarkets: 0, markets: []}
        let items = await Database.raw('select lists.id as id, markets.name as market, markets.id as marketID, products.name as product, products.id as productID, amount, price, weighing, weight from lists, markets, products where lists.product = products.id and lists.market = markets.id')
        let betterOptions = this.calculateBetterPrice(items[0])
        let marketsTotal = this.getTotalMarkets(betterOptions)

        analyze.totalItems = this.getTotalItems(items[0]).length
        analyze.totalMarkets = marketsTotal.length
        analyze.totalBetterPrice = this.getTotalBetterPrice(betterOptions)
        analyze.totalBetterMarkets = this.getTotalBetterMarkets(betterOptions).length

        marketsTotal.map((market) => {
            market = this.analyzeMarket(market, analyze.totalBetterPrice, betterOptions)
            if(market.economy >= 0)
            {
                analyze.markets.push(market)
            }
        })

        response.send(analyze)
    }

    getTotalItems(items)
    {
        let itemsList = []
        items.map((item) => (itemsList.indexOf(item.productID) == -1) ? itemsList.push(item.productID) : "")
        return itemsList
    }

    getTotalMarkets(items)
    {
        let marketsList = []
        items.map((item) => (marketsList.indexOf(item.marketID) == -1) ? marketsList.push(item.marketID) : "")
        return marketsList
    }

    getTotalBetterPrice(items)
    {
        let totalPrice = 0
        items.map((item) => (item.difference == 0) ? totalPrice += item.price : "")
        return totalPrice
    }

    getTotalBetterMarkets(items)
    {
        let marketsList = []
        items.map((item) => (marketsList.indexOf(item.marketID) == -1 && item.difference == 0) ? marketsList.push(item.marketID) : "")
        return marketsList
    }

    analyzeMarket(market, totalBetterPrice, betterOptions)
    {
        let name = ""
        let economy = 0
        let totalPrice = 0

        betterOptions.map((item) => {
            if(item.marketID == market)
            {
                name = item.market
                totalPrice += (parseFloat(item.difference) == 0) ? parseFloat(item.price) : parseFloat(item.difference)
            }
        })
        
        economy = ((totalPrice - totalBetterPrice) < 0) ? 0 : (totalPrice - totalBetterPrice)

        return {name, totalPrice, economy}
    }

    calculateBetterPrice (items) 
    {
        const getItemsWeighings = (items) => items.map((item) => item.weighing)
        const calculateWeighing = (itemWeighing) => itemWeighing / 1000 
        const calculatePrice = (itemsDifference, itemPrice) => itemsDifference * itemPrice
        const calculateDifference = (itemsweighingMax, itemWeighing) => itemsweighingMax / itemWeighing
        const convertWeighing = (item) => (item.weight != 'kg' && item.weight != 'L') ? calculateWeighing(item.weighing) : item.weighing
        const convertWeighingToOriginal = (item) => (item.weight != 'kg' && item.weight != 'L') ? item.weighing * 1000 :  item.weighing

        items.map((obj) => obj.weighing = convertWeighing(obj))

        let itemsByProduct = items.map((obj) => obj.product)
        itemsByProduct = Array.from(new Set(itemsByProduct))

        let result = []

        for (let product of itemsByProduct) 
        {
            product = items.filter((obj) => obj.product == product)

            const weighingMax = Math.max(...getItemsWeighings(product))
            const itemWithLowPrice = product.sort((a, b) => a.price - b.price)[0]

        
            product.map((obj, index) => {
            let differenceWeighing = calculateDifference(weighingMax, obj.weighing)
            let differencePrice = calculatePrice(differenceWeighing, obj.price)

            if(obj.weight == 'kg' || obj.weight == 'L')
            {
                differenceWeighing = weighingMax - obj.weighing

                if(differenceWeighing != 0)
                {
                    differencePrice = calculatePrice(differenceWeighing, obj.price) + obj.price
                }
                else
                {
                    differencePrice = obj.price - itemWithLowPrice.price
                }
            }
            else
            {
                differencePrice = differencePrice - obj.price
            }
            
            product[index].difference = parseFloat(differencePrice).toFixed(2)
            product[index].weighing = convertWeighingToOriginal(obj)
            })  

            result.push(product)
        }

        return items
    }
}

module.exports = AnalyticController
