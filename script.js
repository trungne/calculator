const calculation = {
    numStack: [],
    operator: "",
    result: "",
}
let results = [];

const screen = document.querySelector("#screen_result");
const pastResultsScreen = document.querySelector("#past_results_screen");
const numButtons = document.querySelectorAll('.num');
const operatorButtons = document.querySelectorAll('.operator');
const equalButton = document.querySelector("#equal");
const dotButton = document.querySelector("#dot");
const clearButton = document.querySelector("#clear_all");
const changeSignButton = document.querySelector("#change_sign");

const operate = function (){
    if (!(calculation['numStack'].length === 2) || !calculation['operator']){
        return;
    }

    firstNum = parseFloat(calculation['numStack'][0]);
    secondNum = parseFloat(calculation['numStack'][1]);
    operator = calculation['operator'];
    let result;

    if (operator === "+"){
        result = firstNum + secondNum;
    }
    else if (operator === "-"){
        result = firstNum - secondNum;
    }
    else if (operator === "*"){
        result = firstNum * secondNum;
    }
    else if (operator === "/"){
        if (secondNum === 0){
            result = NaN;
        }
        else{
            result = firstNum / secondNum;
        }
    }

    // store previous calculation
    if (!(isNaN(result))){
        // only store valid calculation
        calculation['result'] = result.toString();
        results.push(JSON.parse(JSON.stringify(calculation)));
        
    }

    // reset calcuation with first number as the previous result
    calculation["numStack"][0] = result.toString();
    calculation["numStack"].pop();
    calculation["operator"] = "";
}
const displayPastResults = function (){
    // display nothing if there are no past results
    if (!results.length){
        return;
    }

    result = document.createElement("div");
    currentCalculation = results[results.length - 1];
    result.textContent = `${currentCalculation['numStack'][0]} ${currentCalculation['operator']} ${currentCalculation['numStack'][1]} = ${currentCalculation['result']}`;
    
    if (pastResultsScreen.childNodes.length >= 4){
        pastResultsScreen.removeChild(pastResultsScreen.lastChild);
        results.shift();
    }

    pastResultsScreen.insertBefore(result, pastResultsScreen.firstChild);
}
const display = function (){
    if (calculation['numStack'][0] === NaN.toString()){
        screen.textContent = `You can't do that, man!`;
        calculation['numStack'] = [];
        calculation['operator'] = "";
    }
    else{
        screen.textContent = generateTextContentForCalculation(calculation);
    }
}

const generateTextContentForCalculation = function(calculation){
    const firstNum = (calculation['numStack'][0] ? calculation['numStack'][0] : "");
    const secondNum = (calculation['numStack'][1] ? calculation['numStack'][1] : "");
    const operator = calculation['operator'];

    return `${firstNum} ${operator} ${secondNum}`;
}

const clearDisplay = function(){
    screen.textContent = "";
}

const addDot = function() {
    // check if numStack is empty, if so. Simply add a dot, presenting 0.xxx
    if (!calculation["numStack"].length){
        calculation["numStack"].push(".");
        display(calculation);
        return;
    }

    const lastIndex = calculation["numStack"].length - 1;
    let lastNum = calculation["numStack"][lastIndex];
    const dotIndex = lastNum.indexOf(".");

    if (dotIndex === -1){ // no dot in number
        lastNum += ".";
    }
    else{
        lastNum = lastNum.slice(0, dotIndex) + lastNum.slice(dotIndex + 1);
    }
    
    calculation["numStack"][lastIndex] = lastNum;
    display(calculation);
}


const changeSign = function(calculation){
    // if numStack is empty, no point in changing sign as there is no number
    if(!calculation["numStack"].length){
        return;
    }

    const lastIndex = calculation["numStack"].length - 1;
    if(calculation["numStack"][lastIndex].includes('-')){
        calculation["numStack"][lastIndex] = calculation["numStack"][lastIndex].slice(1);
    }
    else{
        calculation["numStack"][lastIndex] = "-" + calculation["numStack"][lastIndex];
    }
}


const inputNumber = function(digit) {
    // if stack is empty, create a number
    if (!calculation["numStack"].length){
        calculation["numStack"].push(digit);
    }
    else{
        const lastIndex = calculation["numStack"].length - 1;
        calculation["numStack"][lastIndex] += digit;
    }

    display(calculation);
}

const inputOperator = function(operator){
    // edge cases:
    // operator has been entered
    if (calculation["operator"]){
        return;
    }
    
    if (calculation["numStack"].length){
        calculation["operator"] = operator;
        calculation["numStack"].push("");
    }

    display(calculation);
}

numButtons.forEach((button) => {
    button.addEventListener('click', (e) => inputNumber(e.target.textContent));
});

operatorButtons.forEach((button) => {
    button.addEventListener('click', e => inputOperator(e.target.textContent));
});

equalButton.addEventListener('click', () => {
    operate();
    display();
    displayPastResults();
});

dotButton.addEventListener('click', addDot);

clearButton.addEventListener('click', () => {
    calculation["numStack"] = [];
    calculation["operator"] = "";
    clearDisplay();
})

changeSignButton.addEventListener('click', () => {
    changeSign(calculation);
    display();
})

window.addEventListener('keydown', e => {
    if (!isNaN(e.key)){
        inputNumber(e.key);
    }

    else if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/"){
        inputOperator(e.key);
    }

    else if (e.key === "Enter"){
        operate();
        display();
        displayPastResults();
    }
})