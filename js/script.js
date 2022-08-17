const display = document.querySelector('.display');
const numButtons = document.querySelectorAll(".number");
const opsButtons = document.querySelectorAll(".operation");
const ctrlButtons = document.querySelectorAll(".ctrl");

const memory = {
    a: null,
    operator: null,
    justUpdated: null,
}

numButtons.forEach(num => num.addEventListener('click', updateDisplay));
opsButtons.forEach(num => num.addEventListener('click', storeNumOp));
ctrlButtons[0].addEventListener('click', undo);
ctrlButtons[1].addEventListener('click', reset);
window.addEventListener('keydown', processKey);

function updateDisplay(e) {
    const curNum = display.textContent.trim();
    const newNum = e.srcElement.textContent.trim();

    if (memory.justUpdated) {
        display.textContent = newNum;
        memory.justUpdated = false;
        return
    }

    if (curNum === '0') {
        display.textContent = (newNum == '.') ? curNum + newNum : newNum;
        return
    }
    if (newNum == '.') {
        if (memory.justUpdated) {
            display.textContent = '0.';
            memory.justUpdated = false;
        } else {
            display.textContent = curNum.includes('.') ? curNum : curNum + newNum;
        }
        
        return
    }
    if (curNum.length > 10) {
        display.textContent = curNum;
        return
    }

    display.textContent = curNum + newNum;

}

function storeNumOp(e) {
    let operator = e.srcElement.textContent.trim();

    if (memory.a === null && operator != '=') {
        memory.a = +display.textContent.trim();
        memory.operator = operator;
        memory.justUpdated = true;
        return
    }

    if (memory.a === null && operator == '=') return;

    if (memory.justUpdated) return;

    let b = +display.textContent.trim();
    let result = operate(memory.operator, memory.a, b);
    display.textContent = Math.round(result * 10e8)/10e8    ;
    if (operator == '=') {
        memory.a = null;
        memory.operator = null;
        memory.justUpdated = true;
    } else {
        memory.a = result;
        memory.operator = operator;
        memory.justUpdated = true;
    }
    

}

function undo(e) {
    if (display.textContent.length == 1) {
        display.textContent = 0;
        return
    }
    display.textContent = display.textContent.slice(0, display.textContent.length-1);
}

function reset(e) {
    display.textContent = 0;
    memory.a = null;
    memory.operator = null;
    memory.justUpdated = null;
}

function processKey(e) {
    const key = document.querySelector(`div[data-key="${e.key}"]`);
    if (key == null) return;
    key.click();
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
    if (b === 0) {
        alert("Cannot divide by zero");
        return 0;
    }
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
            return divide(a, b);
    }
}