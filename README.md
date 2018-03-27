# Sales taxes problem
This is my solution of XPeppers's sales-taxes-problem

## Build and Run
```
npm install
npm test
```

## Tax rounding
All taxes are calculated separately, therefore the amount is rounded up for each tax

Example with quantity = 1
```
price = 0.01
basicTax = 0.10
importedTax 0.05

taxAmount = roundUp( 0.01 * 0.10 ) + roundUp( 0.01 * 0.05 ) = 0.05 + 0.05 = 0.10
```
