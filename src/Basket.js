module.exports = class Baskets {
	constructor() {
		this._items = []
	}
	get taxedPrice() {
		let taxedPrice = 0

		this._items.forEach(item => { taxedPrice += item.shelfPrice })

		return taxedPrice
	}
	get taxesAmount() {
		let taxesAmount = 0

		this._items.forEach(item => { taxesAmount += item.taxesAmountRounded })

		return taxesAmount
	}
	get receipt() {
		let receipt = ''
		let taxesAmount = 0
		let taxedPrice = 0

		this._items.forEach(item => {
			receipt += item.quantity + ' ' + (item.isImported() ? 'imported ' : '') + item.name + ': ' + item.shelfPrice.toFixed(2) + '\n'
			taxesAmount += item.taxesAmountRounded
			taxedPrice += item.shelfPrice
		})

		receipt += 'Sales Taxes: ' + taxesAmount.toFixed(2) + '\n'
		receipt += 'Total: ' + taxedPrice.toFixed(2)

		return receipt
	}
	addItem(item) {
		this._items.push(item)
	}
}