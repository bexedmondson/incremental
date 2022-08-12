var h1 = document.querySelector("h1");
var firstButton = document.querySelector("#reset");

init();

function init() {
	messageDisplay.textContent = "Hello!";
	resetButton.textContent = "Click me";
}

resetButton.addEventListener("click", function() {
	helloWorld();
});

function reset() {
	h1.style.backgroundColor = "#2C8E99";
    messageDisplay.textContent = "You did it!";
	resetButton.textContent = "Clicked!";
}
