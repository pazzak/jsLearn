var inputString;
var resultElement;

function activate() {
    var inputElement = document.querySelector(".input-field");
    resultElement = document.querySelector(".result_text");

    inputString = inputElement.value;

    if (inputString.length > 0) {
        removeRepetitions(inputString);
    }
}

function removeRepetitions(inputString) {
    var exp = /([^\s\.?,;:!]+)/g;
    var words = inputString.match(exp);
    var resultString = inputString;

    var shortestWord = getShortestWord(words);
    for (var i=0; i<shortestWord.length; i++) {
        var symbol = shortestWord[i];
        if(isCommonElement(shortestWord[i], words)) {
            resultString = resultString.replace(new RegExp(symbol, 'g'), '');
        }
    }

    resultElement.innerText = "Результат: " +resultString;
}

function getShortestWord(words) {
	var minLength = 500;
	var shortestElement = '';

	words.forEach(function(element, index, array) {
		if(element.length < minLength) {
			minLength = element.length;
			shortestElement = element;
		}
	});

	return shortestElement;
}

function isCommonElement(symbol, words) {
    return words.every(function(word) {
        return word.includes(symbol);
    });
}
