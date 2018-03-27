const Utils = require('../src/Utils')
const chai = require('chai')
const expect = chai.expect

describe('Testing the Utils function', function () {
	it('0.0 should be equal to zero', function() {
		const result = Utils.fixFloatingPoint(0.0)

		expect(result).to.equal(0)
	})

	it('the result of 0.1 + 0.2 should be 0.3', function() {
		const result = Utils.fixFloatingPoint(0.1 + 0.2)

		expect(result).to.equal(0.3)
	})

	it('the result of 0.1 * 0.2 should be 0.02', function() {
		const result = Utils.fixFloatingPoint(0.1*0.2)

		expect(result).to.equal(0.02)
	})
})