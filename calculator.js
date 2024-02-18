const operationButtons = document.querySelectorAll('.operator');
const numbers = document.querySelectorAll('.numbers');
const equal = document.querySelector('.equal');
const allClear = document.querySelector('.clearAll');
const singleClear = document.querySelector('.clearSingle');
const display = document.querySelector('.display');
let checkError = 0;
let noFirstNumberError = 0;
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

function power(num1, num2) {
    return Math.pow(num1, num2);
}

function clearNumber() {
    firstNumber = '';
    secondNumber = '';
    operator = '';
    arrOfOperators = [];
    checkError = 0;
    noFirstNumberError = 0;
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
        return power(Number(firstNumber), Number(secondNumber));
    }
}

for (let i = 0; i < operationButtons.length; i++) {
    operationButtons[i].addEventListener( 'click', (event) => {
        operator = event.target.name;

        arrOfOperators.push(operator);
        // console.log(arrOfOperators);
        console.log(arrOfOperators[0]);
        console.log(arrOfOperators[1]);

        if (noFirstNumberError > 0) {
            displayErrorMessage();
            return;
        }

        if (arrOfOperators[1] != undefined && secondNumber == '') {
            checkError++;
            arrOfOperators.pop();
            return undefined;
        }

        if (firstNumber == '') {
            return;
        }

        if (firstNumber != '' && secondNumber == '') {
            console.log("Inside if block");
            return firstNumber;
        }
        
        operator = arrOfOperators[0];

        result = getResult(operator);

        display.textContent = result;
        
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

        // Checks if user has defined an operator first and then a number.
        if (firstNumber == '' && arrOfOperators[0] != undefined) {
            console.log("Inside another pesky error block");
            noFirstNumberError++;
            return;
        }

        if (checkSecondNumber()) {
            secondNumber += number;
            display.textContent = secondNumber;
        }

        if (checkError > 0) {
            console.log("Inside button error");
            displayErrorMessage();
            return;
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

    if (operator != '' && secondNumber == '') {
        // display.textContent = "ERROR";
        displayErrorMessage();
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
    firstNumber = result;
    console.log(result);
});

allClear.addEventListener( 'click', () => {
    clearNumber();
});