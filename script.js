const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

function appendToDisplay(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

function backspace() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        const result = eval(display.value);
        if (result === Infinity || isNaN(result)) {
            throw new Error("Invalid operation");
        }
        display.value = result;
    } catch (error) {
        display.value = "Error";
        setTimeout(clearDisplay, 1500);
    }
}


buttons.forEach(button => {
    button.addEventListener('click', () => {
        const key = button.getAttribute('data-key');

        if (key === 'C') {
            clearDisplay();
        } else if (key === 'Backspace') {
            backspace();
        } else if (key === 'Enter') {
            calculate();
        } else {
            appendToDisplay(key);
        }
    });
});

document.addEventListener('keydown', (e) => {
    if (
        (e.key >= '0' && e.key <= '9') ||
        ['+', '-', '*', '/', '.'].includes(e.key)
    ) {
        appendToDisplay(e.key);
    } else if (e.key === 'Enter') {
        e.preventDefault();
        calculate();
    } else if (e.key === 'Backspace') {
        backspace();
    } else if (e.key === 'Escape') {
        clearDisplay();
    }
});
