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
        rowDiv.append(button);
    });
});