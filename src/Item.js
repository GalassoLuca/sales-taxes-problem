const IMPORTED_TAX = 0.05
const BASIC_TAX = 0.10
const ROUND_PRECISION = 0.05

module.exports = class Item {
	constructor(name, quantity, price, hasBasicTax, isImported = false) {
		this._name = name
		this._quantity = quantity
		this._price = price
		this._hasBasicTax = hasBasicTax
		this._isImported = isImported

		this._tax = 0
		this._tax += ( hasBasicTax ? BASIC_TAX : 0) + ( isImported ? IMPORTED_TAX : 0) // semantic meaning of different tax
	}
	get name() {
		return this._name
	}
	get quantity() {
		return this._quantity
	}
	get price() {
		return this._price
	}
	get tax() {
		return this._tax
	}
	get taxAmountRounded() {
		const singleTax = this._price * this._tax
		const singleTaxRounded = Math.round(singleTax / ROUND_PRECISION) * ROUND_PRECISION
		const taxAmountRounded = singleTaxRounded * this._quantity
		return Item.fixFloatingPointBug(taxAmountRounded)
	}
	get shelfPrice() {
		const shelfPrice = this._price * this._quantity + this.taxAmountRounded
		return Item.fixFloatingPointBug(shelfPrice)
	}
	isImported() {
		return this._isImported
	}

	static fixFloatingPointBug(floatNumber) {
		// floating point representation fail: https://gooroo.io/GoorooTHINK/Article/16306/Is-Math-Broken-in-JavaScript-Part-2/18867#.WrYUuZPwa34
		return parseFloat(floatNumber.toFixed(2))
	}
}

