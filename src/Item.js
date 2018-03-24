const IMPORTEX_TAX = 0.10
const ROUND_PRECISION = 0.05

class Item {
	constructor(name, quantity, price, tax, imported = false) {
		this._name = name
		this._quantity = quantity
		this._price = price
		this._tax = ( imported ? tax + IMPORTEX_TAX : tax) // semantic meaning of different tax
	}
	get shelfPrice() {
		const taxAmount = this._price * this._tax
		const taxAmountRounded = Math.round(taxAmount / ROUND_PRECISION) * ROUND_PRECISION
		let shelfPrice = this._price + taxAmountRounded
		// floating point representation fail: https://gooroo.io/GoorooTHINK/Article/16306/Is-Math-Broken-in-JavaScript-Part-2/18867#.WrYUuZPwa34
		return shelfPrice.toFixed(2)
	}






	print() {
		console.log(
			"name " + this._name +
			"\nquantity " + this._quantity +
			"\nprice " + this._price +
			"\nvat " + this._vat + "\n"
		)
	}
}

var item = new Item("Book", 2, 12.99, 0.1)
item.print()

console.log(item.shelfPrice)

// const fs = require('./config/categories.json')
// // var obj = JSON.parse(fs.readFileSync('file', 'utf8'));
// console.log(fs.books.items)