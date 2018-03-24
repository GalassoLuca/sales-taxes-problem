const Item = require('../src/Item')
const chai = require('chai')
const expect = chai.expect

describe('ItemSummary', function() {
	it('the parameters should be the same', function() {
		const item = new Item("book", 2, 12.49, 0)
		
		expect(item.name).to.equal('book')
		expect(item.quantity).to.equal(2)
		expect(item.price).to.equal(12.49)
	})

	it('the amount of the tax should be 0 if the percentage is 0', function() {
		const item = new Item("book", 2, 12.49, 0)
		
		expect(item.taxAmountRounded).to.equal(0.00)
	})

	it('the amount of the tax should be the exact percentage of the price, rounded to the nearest 0.05', function() {
		const tests = [
			{prices: [12.00, 12.22], taxAmountRounded: 1.20},
			{prices: [12.33, 12.55], taxAmountRounded: 1.25},
			{prices: [12.77, 12.88], taxAmountRounded: 1.30}
		]

		tests.forEach(function(test) {
			test.prices.forEach(function(price) {
				const item = new Item("book", 2, price, 0.10)
				expect(item.taxAmountRounded).to.equal(test.taxAmountRounded)
			})
		})
	})

	it('the shelf price should be the untaxed price if the taxes are 0', function() {
		const item = new Item("book", 2, 12.49, 0)
		
		expect(item.shelfPrice).to.equal(12.49)
	})

	it('the price of the shelf should be the price of the item plus the amount of taxes', function() {
		const item = new Item("book", 2, 12.49, 0.1)
		
		expect(item.shelfPrice).to.equal(13.74)
	})
})