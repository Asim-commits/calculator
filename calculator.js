const operationButtons = document.querySelectorAll('.operator');
const numbers = document.querySelectorAll('.numbers');
const equal = document.querySelector('.equal');
const display = document.querySelector('.display');
let operator = '';
let firstNumber = '';
let secondNumber = '';
let result = '';
let arr = [];
let arrOfOperators = [];


function add(num1, num2) {
    return (num1 + num2);
}

function subtract(num1, num2) {
    return (num1 - num2);
}

function multiply(num1, num2) {
    return (num1 * num2);
}

function divide(num1, num2) {
    return (num1 / num2);
}

function operate(num1, operator, num2) {
    if (operator == '+') {
        return add(num1, num2);
    } else if (operator == '-') {
        return subtract(num1, num2);
    } else if (operator == '*') {
        return multiply(num1, num2);
    } else if (operator == '/') {
        return divide(num1, num2); 
    } else {
        console.log("Invalid operator");
    }
}


/* Instead of adding a single event listener to all the buttons, add event listener based on the functions of the button. 
    For example: +, -, *, / & ^ are operators and they can be added to a single event listener.
*/

function checkSecondNumber() {
    if (operator == '') {
        return false;
    }
    return true;
}

for (let i = 0; i < operationButtons.length; i++) {
    operationButtons[i].addEventListener( 'click', (event) => {
        operator = event.target.name;
        arrOfOperators.push(operator);
        console.log("Array of operators: ", arrOfOperators);

        if (firstNumber == '') {
            return;
        }

        if (firstNumber != '' && secondNumber == '') {
            return firstNumber;
        }
        
        operator = arrOfOperators[0];
        console.log("Operator: ", operator);
        if (operator == '+') {
            result = add(Number(firstNumber), Number(secondNumber));
        } else if (operator == '-') {
            result = subtract(Number(firstNumber), Number(secondNumber));
        } else if (operator == '*') {
            result = multiply(Number(firstNumber), Number(secondNumber));
        } else if (operator == '/') {
            result = divide(Number(firstNumber), Number(secondNumber));
        } else {
            console.log("Invalid");
        }
        firstNumber = result; 
        secondNumber = '';
        arrOfOperators.splice(0, 1);
        console.log("First Number and second Number in operationButton :", firstNumber, secondNumber);
    })
}


for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener ( 'click', (event) => {
        number = event.target.name;
        
        if (secondNumber == '' && operator == '') {
            firstNumber += number;
        }

        if(checkSecondNumber()){
            secondNumber += number;
        }
        
        console.log("First Number: " + firstNumber);
        console.log("Second Number: " + secondNumber);
    })
}


equal.addEventListener( 'click', () => {
    console.log("First Number: " + firstNumber + " Second Number: " + secondNumber);
})