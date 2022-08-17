const display = document.querySelector('.display');
const numButtons = document.querySelectorAll(".button.number");
const opsButtons = document.querySelectorAll(".button.operation");
const ctrlButtons = document.querySelectorAll(".button.ctrl");

const memory = {
    a: null,
    b: null,
    operator: null,
}

numButtons.forEach(num => addEventListener('click', updateDisplay));
opsButtons.forEach(num => addEventListener('click', storeNumOp));

function updateDisplay(e) {
    const curNum = display.textContent.trim();
    const newNum = e.srcElement.textContent.trim();
    if (curNum === '0') {
        display.textContent = (newNum == '.') ? curNum + newNum : newNum;
        return
    }
    if (newNum == '.') {
        display.textContent = curNum.includes('.') ? curNum : curNum + newNum;
        return
    }
    if (curNum.length > 10) {
        display.textContent = curNum;
        return
    }

    display.textContent = curNum + newNum;

}

function storeNumOp(e) {
    if (memory.a === null) {
        memory.a = +display.textContent;
        memory.operator = e.srcElement.textContent;
    } else {
        
    }

}


function add(a, b) {
    return a + b
}

function subtract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    return a / b
}

function operate(operator, a, b) {
    switch(operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '×':
            return multiply(a, b);
        case '÷':
            return multiply(a, b);
    }
}