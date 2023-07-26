const addCountBtn = document.querySelector('#add-count'),
removeCountBtn = document.querySelector('#remove-count'),
showCountContainer = document.querySelector('#show-count');

let number = 0;

showCount(number);

function plusNumber() {
    if(number > 10) {
        return;
    }
    number += 1;
    showCount(number);
}

function minusNumber() {
    if(number < 0) {
        return;
    }
    number -= 1;
    showCount(number);
}

function showCount(number) {
    showCountContainer.innerHTML = `<p>${number}</p>`
}

addCountBtn.addEventListener('click', plusNumber);
removeCountBtn.addEventListener('click', minusNumber);