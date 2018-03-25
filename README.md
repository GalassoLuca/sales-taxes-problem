# Sales taxes problem
This is my solution of the sales taxes problem

## Build and Run
```
npm install
npm test
```

## Tax rounding
All taxes are seen like a single final tax, therefore a single final rounding will be made

Example
```
price = 0.24
basicTax = 0.10
importedTax 0.05

taxAmount = rounding(0.24 * 0.10 * 0.05) = rounding(0.036) = 0.05
```

