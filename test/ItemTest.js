const Item = require('../src/Item')
const chai = require('chai')
const expect = chai.expect

describe('Tests of the Item', function() {
	it('default should be not imported', function() {
		const item = new Item('book', 1, 12.49, true)

		expect(item.isImported()).to.equal(false)
	})

	it('the parameters should be the same', function() {
		const name = 'book'
		const quantity = 2
		const price = 12.49
		const hasBasicTax = false
		const item = new Item(name, quantity, price, hasBasicTax)
		
		expect(item.name).to.equal('book')
		expect(item.quantity).to.equal(2)
		expect(item.price).to.equal(12.49)
		expect(item.taxes).to.equal(0)
	})

	it('the amount of the taxes should be 0 if the percentage is 0', function() {
		const hasBasicTax = false
		const item = new Item('book', 1, 12.49, hasBasicTax)
		
		expect(item.taxesAmountRounded).to.equal(0)
	})

	it('the taxes should be 10% if there is only the basic tax', function() {
		const hasBasicTax = true
		const item = new Item('book', 1, 12.49, hasBasicTax)
		
		expect(item.taxes).to.equal(0.10)
	})

	it('the shelf price should be the untaxed price if there are no taxes', function() {
		const price = 12.49
		const hasBasicTax = false
		const item = new Item('book', 1, price, hasBasicTax)
		
		expect(item.shelfPrice).to.equal(12.49)
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

	it('an imported product should have an extra tax of 5%', function() {
		const hasBasicTax = true
		const isImported = true
		const item = new Item('book', 1, 12.49, hasBasicTax, isImported)

		expect(item.taxes).to.equal(0.15)
	})

	it('get the shelf price for item with more quantity', function() {
		const quantity = 2
		const price = 0.24
		const hasBasicTax = true
		const isImported = true
		const item = new Item('book', quantity, price, hasBasicTax, isImported)

		expect(item.shelfPrice).to.equal(0.58)
	})

	it('get the shelf price for item with more quantity and no taxes', function() {
		const quantity = 2
		const price = 0.24
		const hasBasicTax = false
		const item = new Item('book', quantity, price, hasBasicTax)

		expect(item.shelfPrice).to.equal(0.48)
	})

	describe('Taxes rounding', function() {
		it('the amount of the taxes should be the exact percentage of the price, rounded to the nearest 0.05', function() {
			const hasBasicTax = true
			const tests = [
				{prices: [12.00, 12.22], taxesAmountRounded: 1.20},
				{prices: [12.33, 12.55], taxesAmountRounded: 1.25},
				{prices: [12.77, 12.88], taxesAmountRounded: 1.30}
			]
			
			tests.forEach(function(test) {
				test.prices.forEach(function(price) {
					const item = new Item('book', 1, price, hasBasicTax)
					expect(item.taxesAmountRounded).to.equal(test.taxesAmountRounded)
				})
			})
		})

		it('the amount of the taxes should be rounded before multiplying by the quantity', function() {
			const price = 0.24
			const hasBasicTax = true
			const quantity = 2
			const item = new Item('book', quantity, price, hasBasicTax)
			
			expect(item.taxesAmountRounded).to.equal(0)
		})

		it('the rounding of the taxes should be a final operation', function() {
			const item = new Item('book', 1, 0.24, true, true)

			expect(item.shelfPrice).to.equal(0.29)
		})
	})
})








