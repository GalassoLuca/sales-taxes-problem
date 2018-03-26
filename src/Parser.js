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
		
		const quantity = parseInt(textArray[0])
		const price = parseFloat(textArray.pop())
		textArray.pop()
		
		const content = Parser._parseContent(textArray.slice(1, textArray.length).join(' '))
		const hasSalesTax = Parser._hasSalesTax(content.name)
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
		return ! CATEGORIES.some(category => {return category.keywords.includes(name)})
	}
}


