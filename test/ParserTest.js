const Parser = require('../src/Parser')
const chai = require('chai')
const expect = chai.expect

describe('Parser test', function() {
	it('all the parameters should be parsed correctly', function() {
		const item = Parser.parseItem('2 book at 12.49')

		expect(item.name).to.equal('book')
		expect(item.quantity).to.equal(2)
		expect(item.price).to.equal(12.49)
	})

	it('not imported books should not have taxes', function() {
		const item = Parser.parseItem('2 book at 12.49')

		expect(item.tax).to.equal(0)
	})

	it('imported food should have 5% tax', function() {
		const item = Parser.parseItem('1 imported box of chocolates at 10.00')

		expect(item.tax).to.equal(0.05)
	})

	describe('Check the receipt of the given input', function() {
		it('the receipt of the 1st given input should be printed correctly', function() {
			const shoppingBasket = `2 book at 12.49
1 music CD at 14.99
1 chocolate bar at 0.85`
			const expectedReceipt = `2 book: 24.98
1 music CD: 16.49
1 chocolate bar: 0.85
Sales Taxes: 1.50
Total: 42.32`

			const basket = Parser.parseBasket(shoppingBasket)

			expect(basket.receipt).to.equal(expectedReceipt)
		})

		it('the receipt of the 2nd given input should be printed correctly', function() {
			const shoppingBasket = `1 imported box of chocolates at 10.00
1 imported bottle of perfume at 47.50`
			const expectedReceipt = `1 imported box of chocolates: 10.50
1 imported bottle of perfume: 54.65
Sales Taxes: 7.65
Total: 65.15`

			const basket = Parser.parseBasket(shoppingBasket)

			expect(basket.receipt).to.equal(expectedReceipt)
		})

		it('the receipt of the 3rd given input should be printed correctly', function() {
			const shoppingBasket = `1 imported bottle of perfume at 27.99
1 bottle of perfume at 18.99
1 packet of headache pills at 9.75
3 box of imported chocolates at 11.25`
			const expectedReceipt = `1 imported bottle of perfume: 32.19
1 bottle of perfume: 20.89
1 packet of headache pills: 9.75
3 imported box of chocolates: 35.55
Sales Taxes: 7.90
Total: 98.38`

			const basket = Parser.parseBasket(shoppingBasket)

			expect(basket.receipt).to.equal(expectedReceipt)
		})
	})
})