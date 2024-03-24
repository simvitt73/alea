import { ComputeEngine } from '@cortex-js/compute-engine'

const expr = '1\\times 4 + (-1)\\times x'
const engine = new ComputeEngine()
const parsedExpression = engine.parse(expr, { canonical: false })
console.log(parsedExpression.json)

const json = engine.parse(expr, { canonical: ['Multiply', 'InvisibleOperator'] }).json
type Expression = typeof json

function removeMultiplyByOneInExpression (arr: Expression) {
  if (!Array.isArray(arr)) return
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i])
    if (arr[i] === 'PreDecrement') {
    }
    if (Array.isArray(arr[i])) {
      if ((arr[i][0] === 'Multiply' || arr[i][0] === 'InvisibleOperator') && arr[i][1] === 1) {
        arr[i] = arr[i][2]
      } else if ((arr[i][0] === 'Multiply' || arr[i][0] === 'InvisibleOperator') && arr[i][2] === 1) {
        arr[i] = arr[i][1]
      } else {
        removeMultiplyByOneInExpression(arr[i])
      }
    }
  }
  return arr
}

function removeMultiplyByOne (expression: string) {
  const parsedExpression = engine.parse(expression, { canonical: false })
  const resultJson = removeMultiplyByOneInExpression(parsedExpression.json)
  return engine.serialize(resultJson, { canonical: false })
}

console.log(removeMultiplyByOne('--3x'))
