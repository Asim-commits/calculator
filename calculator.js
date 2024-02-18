const operationButtons = document.querySelectorAll('.operator');
const numbers = document.querySelectorAll('.numbers');
const equal = document.querySelector('.equal');
const allClear = document.querySelector('.clearAll');
const singleClear = document.querySelector('.clearSingle');
const display = document.querySelector('.display');


let checkError = 0;
let noFirstNumberError = 0;
let operator = '';
let combinedStr = '';
let firstNumber = '';
let secondNumber = '';
let number = '';
let result = '';
let arr = [];
let arrOfOperators = [];
let operatorsToBeDeleted = [];

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
        operatorsToBeDeleted.push(operator); // Required for del operation
        console.log("Array of operators:", arrOfOperators);
        console.log("Each indexes are: ");
        console.log(arrOfOperators[0]);
        console.log(arrOfOperators[1]);

        if (noFirstNumberError > 0) {
            displayErrorMessage();
            return;
        }

        if (typeof(firstNumber) == 'undefined') {
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

        
        console.log("First Number and second Number in operation button:", firstNumber, secondNumber);
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
        if (typeof(firstNumber) == 'undefined' && typeof(arrOfOperators[0]) != 'undefined') {
            console.log("Array of operators: ", arrOfOperators)
            noFirstNumberError++;
            console.log("inside this block");
            return;
        }

        if (checkSecondNumber()) {
            secondNumber += number;
            display.textContent = secondNumber;
            console.log("second number is present");
        }

        // Show an error if user inputs multiple operators.
        if (arrOfOperators[1] != undefined) {
            console.log("1: ", typeof(arrOfOperators[1]));
            console.log("2: ", typeof(secondNumber));
            console.log(arrOfOperators[1]);
            console.log(secondNumber);
            console.log("Second Number: ", secondNumber);
            // checkError++;
            displayErrorMessage();
            return undefined;
        }

        // if (checkError > 0) {
        //     displayErrorMessage();
        //     console.log("this displayed error");
        //     return;
        // }

        console.log("First Number: ", firstNumber);
        console.log("Second Number: ", secondNumber);
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
    secondNumber = '';
    arrOfOperators.pop();
    console.log("First Number in equal operator: ", firstNumber); 
    console.log("Second Number in equal operator: :", secondNumber);
});

singleClear.addEventListener( 'click', () => {
    console.log("All operators : ", operatorsToBeDeleted);
    if (firstNumber != '' && secondNumber == '' && operator == '') {
        console.log("Cursor is at first number");
        let newStr = firstNumber.slice(0, firstNumber.length - 1);
        firstNumber = newStr;
        display.textContent = firstNumber;
    }

    if (firstNumber != '' && operator != '' && secondNumber == '') {
        console.log("Cursor is at operator");
        arrOfOperators.pop();
        // operator = operatorsToBeDeleted;
    }

    if (firstNumber != '' && operator != '' && secondNumber != '') {
        console.log("Cursor is at second number");
        let newStr = secondNumber.slice(0, secondNumber.length - 1);
        secondNumber = newStr;
        display.textContent = secondNumber;
    }
    console.log("First number: " + firstNumber);
    console.log("Second Number: " + secondNumber);
    console.log("Operator: " + operator);
    console.log("Array of operators: ", arrOfOperators);
});

allClear.addEventListener( 'click', () => {
    clearNumber();
});