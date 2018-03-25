const Basket = require('./Basket')
const Item = require('./Item')
const CATEGORIES = require('../config/categories.json')

module.exports = class Parser {
	static parseBasket(text) {
		const basket = new Basket()
		const lineArray = text.split('\n')

		lineArray.forEach(function(line) {
			basket.addItem(Parser.parseItem(line))
		})

		return basket
	}
	static parseItem(lineText) {
		const textArray = lineText.split(' ')
		let i = 0

		const quantity = parseInt(textArray[i++])
		let isImported = false
		if (textArray[i] == 'imported'){
			isImported = true
			i++
		}

		const name = textArray.slice(i, textArray.length - 2).join(' ')
		const hasSalesTax = Parser._hasSalesTax(name)
		
		const price = parseFloat(textArray[textArray.length - 1])
		return new Item(name, quantity, price, hasSalesTax, isImported)
	}

	static _hasSalesTax(name){
		let hasSalesTax = true

		CATEGORIES.books.forEach(function(keyword) {
			if (name == keyword)
				hasSalesTax = false
		})
		CATEGORIES.food.forEach(function(keyword) {
			if (name == keyword)
				hasSalesTax = false
		})
		CATEGORIES.medical.forEach(function(keyword) {
			if (name == keyword)
				hasSalesTax = false
		})

		return hasSalesTax
	}
}