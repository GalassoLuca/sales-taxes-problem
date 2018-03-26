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
		
		const quantity = parseInt(textArray.shift())
		const price = parseFloat(textArray.pop())
		// remove 'at'
		textArray.pop()

		const isImported = textArray.includes('imported')
		const name = textArray.filter(word => {return word !== 'imported'}).join(' ')
		const hasSalesTax = Parser._hasSalesTax(name)

		return new Item(name, quantity, price, hasSalesTax, isImported)
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
		return ! CATEGORIES.some(category => {return category.keywords.includes(name)})
	}
}


