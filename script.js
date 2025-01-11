let displayValue = "0"; // The current value displayed
let firstOperand = null; // The first number in the calculation
let secondOperand = null; // The second number in the calculation
let currentOperator = null; // The current operator
let shouldResetDisplay = false; // Whether to reset the display for new input

// Update the display function
function updateDisplay() {
    const display = document.querySelector('#display');
    display.textContent = displayValue;
}

// Handle button clicks
function handleButtonClick(buttonValue) {
    if (!isNaN(buttonValue)) {
        // If the button is a number
        inputDigit(buttonValue);
    } else if (buttonValue === ".") {
        // If the button is a decimal point
        inputDecimal();
    } else if (buttonValue === "AC") {
        // Clear the calculator
        clear();
    } else if (buttonValue === "⬅️") {
        // Backspace functionality
        backspace();
    } else if (buttonValue === "🟰") {
        // Evaluate the operation
        evaluate();
    } else {
        // Operator buttons
        setOperator(buttonValue);
    }
    updateDisplay();
}

function operate(operator, num1, num2) {
    switch (operator) {
        case '+': 
            return add(num1, num2);
        case '−': 
            return subtract(num1, num2);
        case '×': 
            return multiply(num1, num2);
        case '÷': 
            return divide(num1, num2);
        default: 
            return null;
    }
}

// Handle number input
function inputDigit(digit) {
    if (shouldResetDisplay) {
        displayValue = digit;
        shouldResetDisplay = false;
    } else {
        displayValue = displayValue === "0" ? digit : displayValue + digit;
    }
}

// Handle decimal input
function inputDecimal() {
    if (shouldResetDisplay) {
        displayValue = "0.";
        shouldResetDisplay = false;
        return;
    }
    if (!displayValue.includes(".")) {
        displayValue += ".";
    }
}

// Set the current operator
function setOperator(operator) {
    if (currentOperator !== null) evaluate();
    firstOperand = parseFloat(displayValue);
    currentOperator = operator;
    shouldResetDisplay = true;
}

// Evaluate the current operation
function evaluate() {
    if (currentOperator === null || shouldResetDisplay) return;
    if (currentOperator === "÷" && displayValue === "0") {
        displayValue = "Error: Cannot divide by 0";
        resetCalculator();
        return;
    }
    secondOperand = parseFloat(displayValue);
    displayValue = roundResult(operate(currentOperator, firstOperand, secondOperand));
    currentOperator = null;
    firstOperand = parseFloat(displayValue);
    shouldResetDisplay = true;
}

// Arithmetic functions
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { return b === 0 ? "Error: Cannot divide by 0" : a / b; }

// Round the result to avoid long decimals
function roundResult(value) {
    return Math.round(value * 1000) / 1000;
}

// Clear all values
function clear() {
    displayValue = "0";
    firstOperand = null;
    secondOperand = null;
    currentOperator = null;
    shouldResetDisplay = false;
}

// Backspace functionality
function backspace() {
    displayValue = displayValue.slice(0, -1) || "0";
}

// Attach event listeners to all buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        handleButtonClick(button.textContent);
    });
});

// Initialize the display
updateDisplay();
