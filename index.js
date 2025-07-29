function add(a,b){
    return a+b;
}

function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    return a/b;
}

let firstOperand=null;
let operator=null;
let currentDisplayValue='0';
let waitingForSecondOperand = false; 

function handleNumberInput(numString){
    if(waitingForSecondOperand===true){
        currentDisplayValue=numString;
        waitingForSecondOperand=false;
    }
    else{
        if(currentDisplayValue==='0' && numString !=='.'){
            currentDisplayValue=numString;
        }
        else if(numString==='.' && currentDisplayValue.includes('.')){
            return;
        }
        else{
            currentDisplayValue+=numString;
        }
    }
    display.textContent=currentDisplayValue;
}

function handleOperatorInput(nextOperator){
    const inputValue=parseFloat(currentDisplayValue);
    if(operator!==null && waitingForSecondOperand===true){
        operator=nextOperator;
        return;
    }
    if(firstOperand===null) firstOperand=inputValue;
    else if(operator!==null){
        performCalculation();
    }
    waitingForSecondOperand=true;
    operator=nextOperator;
}

function roundResult(num){
    return Math.round(num * 10000000) / 10000000;
}

function performCalculation(){
    let result;
    if(firstOperand===null || operator===null) return;
    const secondOperand=parseFloat(currentDisplayValue);
    if(isNaN(secondOperand)){
        display.textContent="Error";
        firstOperand = null; operator = null; currentDisplayValue = '0'; waitingForSecondOperand = false;
        return;
    }
    switch(operator){
        case '+':
            result=add(firstOperand,secondOperand);
            break;
        case '-':
            result=subtract(firstOperand,secondOperand);
            break;
        case '*':
            result=multiply(firstOperand,secondOperand);
            break;
        case '/':
            if(secondOperand===0){
                display.textContent='Error: div by 0';
                firstOperand = null; operator = null; currentDisplayValue = '0'; waitingForSecondOperand = false;
                return;
            }  
            else {
                divide(firstOperand,secondOperand);
            }
            break;
        case '%':
            result= firstOperand * (secondOperand / 100);
            break;
        default:
            display.textContent="Error: Invalid Op.";
            firstOperand = null; operator = null; currentDisplayValue = '0'; waitingForSecondOperand = false;
            return;
    }
    result=roundResult(result);
    currentDisplayValue = result.toString();
    firstOperand = result;
    operator = null;
    waitingForSecondOperand = true;
    display.textContent=currentDisplayValue;
}

function handleEqualsInput(){
    performCalculation();
    operator = null;
    waitingForSecondOperand = true; //optional, I just threw it in there just in case 
}

function handleClearAll(){
    currentDisplayValue = '0';
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    display.textContent=currentDisplayValue;
}

function handleLastDelete(){
    if(currentDisplayValue==='Error: div by 0' || currentDisplayValue==="Error: Invalid Op." || waitingForSecondOperand===true){
        handleClearAll();
        return;
    }
    else if(currentDisplayValue.length>1){
        currentDisplayValue=currentDisplayValue.slice(0,-1);
    }
    else{
        currentDisplayValue='0';
    }
    display.textContent=currentDisplayValue;
}

// function calculate(num1, operator, num2) {
//     let result;
//     switch (operator) {
//         case '+':
//             result=(add(num1,num2));
//             break;
//         case '-':
//             result=(subtract(num1,num2));
//             break;
//         case '*':
//             result=(multiply(num1,num2));
//             break;
//         case '/':
//             if (num2 === 0) {
//                 return "Error: Division by zero";
//             }
//             result=(divide(num1,num2));
//             break;
//         default:
//             alert("Error: Invalid operator");
//             return;
//     }
//     alert(result);
// }

const container=document.querySelector("#container");
const calculatorBody=document.createElement("div");
calculatorBody.id="calculator-body";
container.append(calculatorBody);
const display=document.createElement("div");
display.id="display";
display.textContent = currentDisplayValue;
calculatorBody.append(display); 
const content=document.createElement("div");
content.classList.add("frame");
calculatorBody.append(content);
const buttonLayout = [
    ['C', '/', '*', '-'],   // Row 1
    ['7', '8', '9', '+'],   // Row 2
    ['4', '5', '6', 'del'], // Row 3
    ['1', '2', '3', '='],   // Row 4
    ['0', '.', '%', 'AC']   // Row 5
];

function getCssSafeButtonName(buttonText) {
    switch (buttonText) {
        case '/': return 'divide';
        case '*': return 'multiply';
        case '+': return 'plus';
        case '-': return 'minus'; // For the operator minus
        case '=': return 'equals';
        case '.': return 'decimal';
        case '%': return 'percent';
        case 'AC': return 'all-clear';
        case 'del': return 'delete';
        default: return buttonText.toLowerCase();
    }
}

buttonLayout.forEach(rowData => {
    const rowDiv=document.createElement("div");
    rowDiv.classList.add("button-row");
    content.append(rowDiv);
    rowData.forEach(buttonText => {
        const button=document.createElement("button");
        button.textContent=buttonText;
        button.classList.add("calc-button");
        const uniqueButton=getCssSafeButtonName(buttonText);
        button.classList.add(`button-${uniqueButton}`);
        button.addEventListener('click', () => {
            if (!isNaN(parseFloat(buttonText)) || buttonText === '.') {
                // It's a number (0-9) or the decimal point
                handleNumberInput(buttonText);
            } else if (['/', '*', '-', '+', '%'].includes(buttonText)) {
                // It's an operator
                handleOperatorInput(buttonText);
            } else if (buttonText === '=') {
                // It's the equals button
                handleEqualsInput(); // Call the equals handler
            } else if (buttonText === 'C' || buttonText === 'AC') {
                // It's a clear (all clear) button
                handleClearAll(); // Call the clear handler
            } else if (buttonText === 'del') {
                // It's the delete last digit button
                handleLastDelete(); // Call the delete handler
            }
        });
        rowDiv.append(button);
    });
});