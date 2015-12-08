var inputString;
var resultElement;

function activate() {
    var inputElement = document.querySelector(".input-field");
    resultElement = document.querySelector(".result_text");

    inputString = inputElement.value;

    if (inputString.length > 0) {
        calculateFromString(inputString);
    }
}

function calculateFromString(inputString) {
	var firstNumExp = /(-?\d+\.?\d*)/g;
	var tempNumber = parseFloat(firstNumExp.exec(inputString)[1]);
	var exp = /([\+\-–\*\/])[^\+\-–\*\/\d]*(-?\d+\.?\d*)/g;

	var exec;
	while(exec = exp.exec(inputString)) {
		tempNumber = doOperation(tempNumber, parseFloat(exec[2]), exec[1]);
	}

    resultElement.innerText = "Результат: " +tempNumber.toFixed(2);
}

function doOperation(num1, num2, operator) {
	var result;
	switch(operator) {
		case "+": result = num1 + num2; break;
		case "-":
		case "–": result = num1 - num2; break;
		case "*": result = num1 * num2; break;
		case "/": result = num1 / num2;
	}
	return result;
}
