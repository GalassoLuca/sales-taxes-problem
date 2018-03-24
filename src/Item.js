const IMPORTEX_TAX = 0.10
const ROUND_PRECISION = 0.05

module.exports = class Item {
	constructor(name, quantity, price, tax, imported = false) {
		this._name = name
		this._quantity = quantity
		this._price = price
		this._tax = ( imported ? tax + IMPORTEX_TAX : tax) // semantic meaning of different tax
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
		return shelfPrice.toFixed(2)
	}
	isImported() {

	}
}