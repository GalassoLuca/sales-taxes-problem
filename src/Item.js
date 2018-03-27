const IMPORTED_TAX = 0.05
const BASIC_TAX = 0.10
const ROUND_PRECISION = 0.05
const Utils = require('./Utils')

module.exports = class Item {
	constructor(name, quantity, price, hasBasicTax, isImported = false) {
		this._name = name
		this._quantity = quantity
		this._price = price
		this._hasBasicTax = hasBasicTax
		this._isImported = isImported
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
	get taxesAmountRounded() {
		let taxesAmountRounded = 0

		if(this.hasBasicTax()) {
			taxesAmountRounded += Item._roundUp(this._price * BASIC_TAX)
		}

		if(this.isImported()) {
			taxesAmountRounded += Item._roundUp(this._price * IMPORTED_TAX)
		}

		taxesAmountRounded = Utils.fixFloatingPoint(taxesAmountRounded)

		return taxesAmountRounded * this._quantity
	}
	get shelfPrice() {
		const shelfPrice = this._price * this._quantity + this.taxesAmountRounded
		return Utils.fixFloatingPoint(shelfPrice)
	}
	hasBasicTax() {
		return this._hasBasicTax
	}
	isImported() {
		return this._isImported
	}

	toString() {
		return this.quantity + ' ' + (this.isImported() ? 'imported ' : '') + this.name + ': ' + this.shelfPrice.toFixed(2)
	}

	static _roundUp(tax) {
		return Math.ceil(tax / ROUND_PRECISION) * ROUND_PRECISION
	}
}

