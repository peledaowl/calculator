
function updateDisplay(input){
  let display = document.querySelector(".display-input")
  display.textContent = input
}

function calcExpression(a, b, operator){
  const operators = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b
}
  const operation = operators[operator];
  return operation(a, b);
}


let operand1 = null
let operand2 = null
let input = []
let counter = 0
let prevOperator = null
let result = null

const buttons = document.querySelectorAll('button')
buttons.forEach(button => {
  button.addEventListener('mousedown', () => {
    let btnValue = button.getAttribute('data-value')
    if (btnValue == "C"){
      operand1 = null
      operand2 = null
      input = []
      counter = 0
      prevOperator = null
      result = null
      updateDisplay(input)
    }
    else if (btnValue  == 'back') {
      input = input.slice(0, -1);
      updateDisplay(input)
    }
    else if ( btnValue == "+" || btnValue == "-" || btnValue == "*" || btnValue == "/" || btnValue == '=' || btnValue == "%"){
      if (btnValue == "%"){
        if (operand1 == null){operand1 = Number(input)}
        updateDisplay(operand1 = operand1 / 100)
      }
      if (operand1 == null){ 
        operand1 = Number(input)
        updateDisplay(input)
        input = ''
      } 
      else if (btnValue == "="){
        operand2 = Number(input)
        operand1 = calcExpression(operand1, operand2, prevOperator)
        updateDisplay(operand1)
        operand2 = null
        input = null
        prevOperator = '='
      }
      else if (btnValue != "%") {
        operand2 = Number(input)
        input = ''
        if (operand2 != null){
        operand1 = calcExpression(operand1, operand2, btnValue)
        operand2 = null
        updateDisplay(operand1)
      }}
      prevOperator = btnValue
    }
    else {
      if (btnValue == '.'){input += btnValue}
      else {input += Number(btnValue)}
      updateDisplay(input)
    }
  })
})

