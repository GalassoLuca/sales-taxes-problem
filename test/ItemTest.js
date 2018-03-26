const Item = require('../src/Item')
const chai = require('chai')
const expect = chai.expect

describe('Tests of the Item', function() {
	it('the name should be correct', function() {
		const name = 'book'
		const item = new Item(name, 2, 12.49, false)

		expect(item.name).to.equal('book')
	})

	it('the quantity should be correct', function() {
		const quantity = 2
		const item = new Item('book', quantity, 12.49, false)

		expect(item.quantity).to.equal(2)
	})

	it('the price should be correct', function() {
		const price = 12.49
		const item = new Item('book', 2, price, false)
		
		expect(item.price).to.equal(12.49)
	})

	it('the item should have the basic tax if enabled', function() {
		const hasBasicTax = true
		const item = new Item('book', 2, 12.49, hasBasicTax)
		
		expect(item.hasBasicTax()).to.equal(true)
	})

	it('the item should not have the basic tax if disabled', function() {
		const hasBasicTax = false
		const item = new Item('book', 2, 12.49, hasBasicTax)
		
		expect(item.hasBasicTax()).to.equal(false)
	})

	it('the item should be imported if import is enabled', function() {
		const isImported = true
		const item = new Item('book', 2, 12.49, false, isImported)
		
		expect(item.isImported()).to.equal(true)
	})

	it('default should be not imported', function() {
		const item = new Item('book', 1, 12.49, true)

		expect(item.isImported()).to.equal(false)
	})

	it('the shelf price should be 0 if the price is zero', function() {
		const price = 0
		const hasBasicTax = true
		const isImported = true
		const item = new Item('book', 1, price, hasBasicTax, true)
		
		expect(item.shelfPrice).to.equal(0)
	})

	it('the shelf price should be the untaxed price if there are no taxes', function() {
		const price = 12.49
		const hasBasicTax = false
		const item = new Item('book', 1, price, hasBasicTax)
		
		expect(item.shelfPrice).to.equal(12.49)
	})

	it('the amount of the taxes should be 10% of the price if there is only the basic tax', function() {
		const hasBasicTax = true
		const item = new Item('book', 1, 100, hasBasicTax)
		
		expect(item.taxesAmountRounded).to.equal(10)
	})

	it('the amount of the taxes should be multiplied by the quantity', function() {
		const price = 12.50
		const hasBasicTax = true
		const quantity = 2
		const item = new Item('book', quantity, price, hasBasicTax)
		
		expect(item.taxesAmountRounded).to.equal(2.5)
	})

	it('the shelf price should be the untaxed price plus the amount of taxes', function() {
		const price = 12.50
		const hasBasicTax = true
		const item = new Item('book', 1, price, hasBasicTax)
		
		expect(item.shelfPrice).to.equal(13.75)
	})

	it('an imported item with basic tax should have an extra tax of 5%', function() {
		const hasBasicTax = true
		const isImported = true
		const item = new Item('book', 1, 100, hasBasicTax, isImported)

		expect(item.taxesAmountRounded).to.equal(15)
	})

	it('a shelf price of an item with no taxes should be multiplied by the quantity', function() {
		const quantity = 2
		const price = 0.24
		const hasBasicTax = false
		const item = new Item('book', quantity, price, hasBasicTax)

		expect(item.shelfPrice).to.equal(0.48)
	})

	it('a shelf price of an item with taxes should be the price plus the taxes, multiplied by the quantity', function() {
		const quantity = 2
		const price = 100
		const hasBasicTax = true
		const isImported = true
		const item = new Item('book', quantity, price, hasBasicTax, isImported)

		expect(item.shelfPrice).to.equal(230)
	})

	describe('Rounding of the taxes', function() {
		it('the amount of the taxes, of a non imported item with basic tax, should be rounded up to the nearest 0.05', function() {
			const hasBasicTax = true
			const tests = [
				{prices: [0.001, 0.03, 0.5], taxesAmountRounded: 0.05},
				{prices: [0.5001, 0.51, 0.8, 1.0, 1], taxesAmountRounded: 0.10},
				{prices: [12.00001, 12.01, 12.49, 12.5], taxesAmountRounded: 1.25},
				{prices: [12.50001, 12.51, 12.99, 13], taxesAmountRounded: 1.3},
				{prices: [99999.999, 99999.83, 99999.501], taxesAmountRounded: 1000}
			]

			tests.forEach(function(test) {
				test.prices.forEach(function(price) {
					const item = new Item('book', 1, price, hasBasicTax)
					expect(item.taxesAmountRounded).to.equal(test.taxesAmountRounded)
				})
			})
		})

		it('the amount of the taxes should be rounded before multiplying by the quantity', function() {
			const quantity = 2
			const price = 0.01
			const hasBasicTax = true
			const item = new Item('book', quantity, price, hasBasicTax)
			
			expect(item.taxesAmountRounded).to.equal(0.10)
		})

		it('all the taxes should be rounded separately', function() {
			const price = 0.01
			const hasBasicTax = true
			const isImported = true
			const item = new Item('book', 1, price, hasBasicTax, isImported)

			expect(item.taxesAmountRounded).to.equal(0.10)
		})

		it('the shelf price should not be rounded', function() {
			const price = 0.01
			const hasBasicTax = true
			const isImported = true
			const item = new Item('book', 1, price, hasBasicTax, isImported)

			expect(item.shelfPrice).to.equal(0.11)
		})
	})
})








