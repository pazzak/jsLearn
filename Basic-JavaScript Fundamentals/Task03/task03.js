var textElement;
var colorElement;
var markerElement;
var resultElement;

var selectedClass = ".result-element__selected";

window.onload = function() {
    textElement = document.querySelector(".input-field text");
    colorElement = document.querySelector(".input-field color");
    markerElement = document.querySelector(".input-field marker");
    resultElement = document.querySelector(".result-block");
};

function createNewElement() {
    var element = document.createElement("li");

    var text = textElement.value;
    if (text) {
        element.onclick = select;
        setParams(element);
        resultElement.appendChild(element);
    }
}

function changeParameters() {
    var element = document.querySelector(selectedClass);
    if (element) {
        setParams(element);
    }
}

function deleteElement() {
    var element = document.querySelector(selectedClass);
    if (element) {
        element.parentNode.removeChild(element);
    }
}

function setParams(element) {
    if (element) {
        element.innerText = textElement.value;
        element.style.color = colorElement.value;
        element.style.listStyleType = markerElement.value;
    }
}

function select(event) {
    var selectedElement = document.querySelector(selectedClass);
    if (selectedElement) {
        selectedElement.classList.remove(selectedClass);
    }
    event.target.classList.add(selectedClass);
    event.stopPropagation();
}
