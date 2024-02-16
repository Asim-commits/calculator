const buttons = document.querySelector('.buttons');
const display = document.querySelector('.display');
let input = '';

buttons.addEventListener('click', (event) => {

    // The if statement is used because the target was selecting the div.
    const isButton = event.target.nodeName === "BUTTON";
    if(!isButton) {
        return;
    }
    input += event.target.name;
    display.innerText =input;
})


// function add(num1, num2) {
//     console.log(num1 + num2);
// }

// function subtract() {
//     console.log(num1 - num2);
// }

// function multiply() {
//     console.log(num1 * num2);
// }

// function divide() {
//     console.log(num1 / num2);
// }

// function operate(operator, num1, num2) {
//     if (operator == '+') {
//         add(num1, num2);
//     } else if (operator == '-') {
//         subtract(num1, num2);
//     } else if (operator == '*') {
//         multiply(num1, num2);
//     } else if (operator == '/') {
//         divide(num1, num2); 
//     } else {
//         console.log("Invalid operator");
//     }
// }


// const num1 = parseInt(prompt("Enter first number: "));
// const num2 = parseInt(prompt("Enter second number: "));
// const operator = prompt("What operation do you want to perform?");

// operate(operator, num1, num2);