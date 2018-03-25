const Item = require('../src/Item')
const chai = require('chai')
const expect = chai.expect

describe('Tests of the Item', function() {
	it('default should be not imported', function() {
		const item = new Item('book', 1, 12.49, 0.10)

		expect(item.isImported()).to.equal(false)
	})

	it('the parameters should be the same', function() {
		const name = 'book'
		const quantity = 2
		const price = 12.49
		const basicTax = true
		const item = new Item(name, quantity, price, basicTax)
		
		expect(item.name).to.equal('book')
		expect(item.quantity).to.equal(2)
		expect(item.price).to.equal(12.49)
		expect(item.tax).to.equal(0.10)
	})

	it('the amount of the tax should be 0 if the percentage is 0', function() {
		const basicTax = false
		const item = new Item('book', 1, 12.49, basicTax)
		
		expect(item.taxAmountRounded).to.equal(0)
	})

	it('the shelf price should be the untaxed price if there are no taxes', function() {
		const price = 12.49
		const basicTax = false
		const item = new Item('book', 1, price, basicTax)
		
		expect(item.shelfPrice).to.equal(12.49)
	})

	it('the amount of the taxes should be multiplied by the quantity', function() {
		const price = 12.50
		const basicTax = true
		const quantity = 2
		const item = new Item('book', quantity, price, basicTax)
		
		expect(item.taxAmountRounded).to.equal(2.5)
	})

	it('the shelf price should be the untaxed price plus the amount of taxes', function() {
		const price = 12.49
		const basicTax = true
		const item = new Item('book', 1, price, basicTax)
		
		expect(item.shelfPrice).to.equal(13.74)
	})

	it('an imported product should have an extra tax of 5%', function() {
		const item = new Item('book', 1, 12.49, true, true)

		expect(item.shelfPrice).to.equal(14.34)
	})

	it('shelf price for item with more quantity', function() {
		const quantity = 2
		const price = 0.24
		const basicTax = true
		const item = new Item('book', quantity, price, basicTax, true)

		expect(item.shelfPrice).to.equal(0.58)
	})

	it('shelf price for item with more quantity and no taxes', function() {
		const quantity = 2
		const price = 0.24
		const basicTax = false
		const item = new Item('book', quantity, price, basicTax)

		expect(item.shelfPrice).to.equal(0.48)
	})

	describe('Taxes rounding', function() {
		it('the amount of the taxes should be the exact percentage of the price, rounded to the nearest 0.05', function() {
			const basicTax = true
			const tests = [
				{prices: [12.00, 12.22], taxAmountRounded: 1.20},
				{prices: [12.33, 12.55], taxAmountRounded: 1.25},
				{prices: [12.77, 12.88], taxAmountRounded: 1.30}
			]
			
			tests.forEach(function(test) {
				test.prices.forEach(function(price) {
					const item = new Item('book', 1, price, basicTax)
					expect(item.taxAmountRounded).to.equal(test.taxAmountRounded)
				})
			})
		})

		it('the amount of the taxes should be rounded before multiplying by the quantity', function() {
			const price = 0.24
			const basicTax = true
			const quantity = 2
			const item = new Item('book', quantity, price, basicTax)
			
			expect(item.taxAmountRounded).to.equal(0)
		})

		it('the rounding of the taxes should be a final operation', function() {
			const item = new Item('book', 1, 0.24, true, true)

			expect(item.shelfPrice).to.equal(0.29)
		})
	})
})








