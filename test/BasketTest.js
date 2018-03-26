const Basket = require('../src/Basket')
const Item = require('../src/Item')
const chai = require('chai')
const expect = chai.expect
const INPUT1 = require('./fixtures/input1.json')
const INPUT2 = require('./fixtures/input2.json')
const INPUT3 = require('./fixtures/input3.json')

describe('Tests of the shopping Basket', function() {
	it('empty basket has 0 taxes', function() {
		const basket = new Basket()

		expect(basket.taxedPrice).to.equal(0)
	})

	it('empty basket has no amount to pay', function() {
		const basket = new Basket()

		expect(basket.taxesAmount).to.equal(0)
	})

	describe('Check the receipt of the given input', function() {
		it('the receipt of the 1st given input should be printed correctly', function() {
			const basket = new Basket()
			INPUT1.forEach(item => { basket.addItem(new Item(item.name, item.quantity, item.price, item.hasBasicTax, item.isImported)) })

			const expectedReceipt = `2 book: 24.98
1 music CD: 16.49
1 chocolate bar: 0.85
Sales Taxes: 1.50
Total: 42.32`

			expect(basket.receipt).to.equal(expectedReceipt)
		})

		it('the receipt of the 2nd given input should be printed correctly', function() {
			const basket = new Basket()
			INPUT2.forEach(item => { basket.addItem(new Item(item.name, item.quantity, item.price, item.hasBasicTax, item.isImported)) })

			const expectedReceipt = `1 imported box of chocolates: 10.50
1 imported bottle of perfume: 54.65
Sales Taxes: 7.65
Total: 65.15`

			expect(basket.receipt).to.equal(expectedReceipt)
		})

		it('the receipt of the 3rd given input should be printed correctly', function() {
			const basket = new Basket()
			INPUT3.forEach(item => { basket.addItem(new Item(item.name, item.quantity, item.price, item.hasBasicTax, item.isImported)) })

			const expectedReceipt = `1 imported bottle of perfume: 32.19
1 bottle of perfume: 20.89
1 packet of headache pills: 9.75
3 imported box of chocolates: 35.55
Sales Taxes: 7.90
Total: 98.38`

			expect(basket.receipt).to.equal(expectedReceipt)
		})
	})
})





