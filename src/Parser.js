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
		const content = Parser._parseContent(textArray.slice(i, textArray.length - 2).join(' '))

		const hasSalesTax = Parser._hasSalesTax(content.name)
		
		const price = parseFloat(textArray[textArray.length - 1])
		return new Item(content.name, quantity, price, hasSalesTax, content.isImported)
	}
	static _parseContent(content){
		let isImported = false

		const name = content.replace('imported ', function() {
			isImported = true
			return ''
		})

		return { isImported: isImported, name: name}
	}
	static _hasSalesTax(name){
		let hasSalesTax = true

		CATEGORIES.forEach(function(category) {
			category.keywords.forEach(function(keyword) {
				if (name == keyword)
					hasSalesTax = false
			})
		})

		return hasSalesTax
	}
}


