var pages = ["task04_1.html", "task04_2.html", "task04_3.html", "task04_4.html"];
var resultField;

window.onload = function() {
    resultField = document.querySelector(".result-block");
    var nextPage = document.body.getAttribute("page");
    if (++nextPage < 4) {
        startCounter(nextPage);
    } else {
        askRetryOrExit();
    }
};

function startCounter(nextPage) {
    var counter = 5;
    setInterval(function() {
        if(counter) {
            resultField.innerHTML = counter--;
        } else {
            location.replace(pages[nextPage]);
        }
    }, 1000);
}

function askRetryOrExit() {
    if(confirm("Хотите повторить?")) {
        location.replace(pages[0]);
    } else {
        window.close();
        alert("Окно не закрывается :(");
    }
}