module.exports = class Utils {
	static fixFloatingPoint(floatNumber) {
		// floating point representation fail: https://gooroo.io/GoorooTHINK/Article/16306/Is-Math-Broken-in-JavaScript-Part-2/18867#.WrYUuZPwa34
		return parseFloat(floatNumber.toFixed(2))
	}
}