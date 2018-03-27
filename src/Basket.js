const Utils = require('./Utils')

module.exports = class Baskets {
	constructor() {
		this._items = []
	}
	get taxedPrice() {
		const taxedPrice = this._items.reduce((taxedPrice, item) => taxedPrice + item.shelfPrice, 0)
		return Utils.fixFloatingPoint(taxedPrice)
	}
	get taxesAmountRounded() {
		const taxesAmountRounded = this._items.reduce((taxesAmountRounded, item) => taxesAmountRounded + item.taxesAmountRounded, 0)
		return Utils.fixFloatingPoint(taxesAmountRounded)
	}
	get receipt() {
		let receipt = ''

		receipt += this._items.map(item => item.toString()).join('\n') + '\n'
		receipt += 'Sales Taxes: ' + this.taxesAmountRounded.toFixed(2) + '\n'
		receipt += 'Total: ' + this.taxedPrice.toFixed(2)

		return receipt
	}
	addItem(item) {
		this._items.push(item)
	}
}