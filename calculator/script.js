const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');


let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;


function numberValue(number){
    //Replace the current display value if the first value is entered
    if(awaitingNextValue){
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    }
    else{
    //Checks to see if the current display value is 0, if so, replace with the number entered. If the display value is not 0, add the number entered to the display value
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    }
}

function addDecimal(){
    //If operator has already been pressed, do not add a decimal
    if(awaitingNextValue) return;
    //Checks to see if the text context contains a decimal, and if this is not included it will set the text content to add a decimal to the end
    if(!calculatorDisplay.textContent.includes('.')){
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}

//calculate first and second values with operator
const calculate = {
    '/':(firstNumber, secondNumber) => firstNumber / secondNumber,
    '*':(firstNumber, secondNumber) => firstNumber * secondNumber,
    '+':(firstNumber, secondNumber) => firstNumber + secondNumber,
    '-':(firstNumber, secondNumber) => firstNumber - secondNumber,
    '=':(firstNumber, secondNumber) => secondNumber,
};


//takes the string value from the text content and convert it into a number value
function useOperator(operator){
    const currentValue = Number(calculatorDisplay.textContent);
    //Prevents multiple operators
    if(operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return;
    };
    //Assign first value if no value
    if(!firstValue){
        firstValue = currentValue;
    }
    else{
        const calculation = calculate[operatorValue](firstValue, currentValue);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    }
    //Next value, store the operator
    awaitingNextValue = true;
    operatorValue = operator;
}

// Adding Event Listeners
inputBtns.forEach((inputBtn) => {
    //targetsthe button value, add the event listener, targets the click event for the individual button and parses the number value. The 'if' statement checks the classes and its specifications 
    if (inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', () => numberValue(inputBtn.value));
    }
    else if (inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
    }
    else if (inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', () => addDecimal());
    }
});

// Reset all values within the screen display
function resetAll(){
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
    calculatorDisplay.textContent = '0';
}
clearBtn.addEventListener('click', resetAll);