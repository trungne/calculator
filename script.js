let firstNum = "", secondNum = "", operator = "";
let screen = document.querySelector("#screen");
const operate = function (operator, a, b){
    firstNum = parseFloat(a);
    secondNum = parseFloat(b);
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
        if (b == 0){
            result = NaN;
        }
        else{
            result = firstNum / secondNum;
        }
    }
    // TODO: fix this
    secondNum = firstNum;
    firstNum = result;
    operator = "";
    
    console.log(result);
    return result.toString();
}

const display = function (){
    screen.textContent = `${firstNum} ${operator} ${secondNum}`;
}

const clearDisplay = function(){
    screen.textContent = "";
}

const addDot = function() {

    if (!operator){
        if(!firstNum.includes(".")){
            firstNum += ".";
        }
    }
    else{
        if(!secondNum.includes(".")){
            secondNum += ".";
        }
    }
    display();
}


const inputNumber = function(e) {
    // if an operator has been entered, take input as firstNum
    if (!operator){
        firstNum += e.target.textContent;
        console.log(firstNum);
    }
    else{
        secondNum += e.target.textContent;
        console.log(secondNum);
    }
    display();
}

const inputOperator = function(e){
    operator = e.target.textContent;
    console.log(operator);

    if (firstNum && secondNum){
        result = operate(operator, firstNum, secondNum)
    }
    display();
}

const numButtons = document.querySelectorAll('.num');
numButtons.forEach((button) => {
    button.addEventListener('click', (e) => inputNumber(e));
});

const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach((button) => {
    button.addEventListener('click', e => inputOperator(e));
});

const equalButton = document.querySelector("#equal");
equalButton.addEventListener('click', () => operate(operator, firstNum, secondNum));

const dotButton = document.querySelector("#dot");
dotButton.addEventListener('click', addDot);

const clearButton = document.querySelector("#clear_all");
clearButton.addEventListener('click', () => {
    firstNum = "";
    secondNum = "";
    operator = "";
    clearDisplay();
})