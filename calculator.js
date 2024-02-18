const operationButtons = document.querySelectorAll('.operator');
const numbers = document.querySelectorAll('.numbers');
const equal = document.querySelector('.equal');
const allClear = document.querySelector('.clearAll');
const display = document.querySelector('.display');
let checkError = 0;
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
    if (num2 == 0) {
        return "undefined";
    }
    return (num1 / num2);
}

function clearNumber() {
    firstNumber = '';
    secondNumber = '';
    operator = '';
    arrOfOperators = [];
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

function displayErrorMessage() {
    display.textContent = "ERROR";
    clearNumber();
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

function getResult(operator) {
    if (operator == '+') {
        return add(Number(firstNumber), Number(secondNumber));
    } else if (operator == '-') {
        return subtract(Number(firstNumber), Number(secondNumber));
    } else if (operator == '*') {
        return multiply(Number(firstNumber), Number(secondNumber));
    } else if (operator == '/') {
        return divide(Number(firstNumber), Number(secondNumber));
    } else {
        return 0;
    }
}

for (let i = 0; i < operationButtons.length; i++) {
    operationButtons[i].addEventListener( 'click', (event) => {
        operator = event.target.name;

        arrOfOperators.push(operator);
        console.log(arrOfOperators);
        console.log(arrOfOperators[1]);

        if (arrOfOperators[1] != undefined && secondNumber == '') {
            checkError++;
            console.log(checkError);
            console.log("Inside this pesky block");
            arrOfOperators.pop();
            return undefined;
        }
        console.log("Array of operators: ", arrOfOperators);

        if (firstNumber == '') {
            return;
        }

        if (firstNumber != '' && secondNumber == '') {
            console.log("Inside if block");
            return firstNumber;
        }
        
        operator = arrOfOperators[0];

        result = getResult(operator);
        
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
            display.textContent = firstNumber;
        }

        if (checkSecondNumber()) {
            secondNumber += number;
            display.textContent = secondNumber;
        }
        
        console.log("First Number: " + firstNumber);
        console.log("Second Number: " + secondNumber);
    })
}


equal.addEventListener( 'click', () => {
    console.log("Operator: ", arrOfOperators);
    if(secondNumber == '' && operator=='') {
        display.textContent = firstNumber;
        return;
    }

    if (operator != '' && secondNumber =='') {
        display.textContent = "ERROR";
        return;
    }

    if (checkError > 0) {
        displayErrorMessage();
        return;
    }
    result = getResult(arrOfOperators);
    display.textContent = result;
    /* arrOfOperators is used instead of operator variable. Let's say we have to calculate 12+5-7*3. Operator variable stores
    previous operator used. arrOfOperator uses latest operator. When we press =, we want latest operator not previous operator. */
    clearNumber();
    console.log(result);
});

allClear.addEventListener( 'click', () => {
    clearNumber();
});