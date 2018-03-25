const IMPORTED_TAX = 0.05
const BASIC_TAX = 0.10
const ROUND_PRECISION = 0.05

module.exports = class Item {
	constructor(name, quantity, price, hasBasicTax, isImported = false) {
		this._name = name
		this._quantity = quantity
		this._price = price
		this._tax = 0
		this._tax += ( hasBasicTax ? BASIC_TAX : 0) // semantic meaning of different tax
		this._tax += ( isImported ? IMPORTED_TAX : 0) // semantic meaning of different tax
	}
	get name() {

	}
	get quantity() {

	}
	get price() {

	}
	get taxAmountRounded() {
		const taxAmount = this._price * this._tax
		const taxAmountRounded = Math.round(taxAmount / ROUND_PRECISION) * ROUND_PRECISION
		return taxAmountRounded
	}
	get shelfPrice() {
		let shelfPrice = this._price + this.taxAmountRounded
		// floating point representation fail: https://gooroo.io/GoorooTHINK/Article/16306/Is-Math-Broken-in-JavaScript-Part-2/18867#.WrYUuZPwa34
		return shelfPrice
	}
	isImported() {

	}
}