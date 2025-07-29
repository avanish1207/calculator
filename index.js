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

function calculate(num1, operator, num2) {
    let result;
    switch (operator) {
        case '+':
            result=(add(num1,num2));
            break;
        case '-':
            result=(subtract(num1,num2));
            break;
        case '*':
            result=(multiply(num1,num2));
            break;
        case '/':
            if (num2 === 0) {
                return "Error: Division by zero";
            }
            result=(divide(num1,num2));
            break;
        default:
            alert("Error: Invalid operator");
            return;
    }
    alert(result);
}

const container=document.querySelector("#container");
const calculatorBody=document.createElement("div");
calculatorBody.id="calculator-body";
container.append(calculatorBody);
const display=document.createElement("div");
display.id="display";
display.textContent = "0";
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

buttonLayout.forEach(rowData => {
    const rowDiv=document.createElement("div");
    rowDiv.classList.add("button-row");
    content.append(rowDiv);
    rowData.forEach(buttonText => {
        const button=document.createElement("button");
        button.textContent=buttonText;
        button.classList.add("calc-button");
        rowDiv.append(button);
    });
});