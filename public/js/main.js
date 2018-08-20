var addBtn = document.getElementById("addBtn");
var toggleToDoBtn = document.getElementById("toggleToDoBtn");
var toggleDoneBtn = document.getElementById("toggleDoneBtn");
var toggleDeletedBtn = document.getElementById("toggleDeletedBtn");
var ul = document.getElementById("ul");
var form = document.getElementById("form");
var inputs = Array.from(document.getElementsByTagName("input"));
var regSp = /^\s*$/;

function toggleToDo() {

}

function toggleDone() {}

function toggleDeleted() {}

function addLi(input) {
   var tested = regSp.test(input.value)
   if (!tested) {
      ul.innerHTML += '<li><input class="hidden-input" type="text"placeholder="' + input.value + '"><span>' + input.value + '</span><i class="fas fa-check-square"></i><i class="fas fa-edit"></i><i class="fas fa-trash-alt"></i></li>'
   }
   input.value = "";
}

toggleToDoBtn.addEventListener('click', () => {
   event.preventDefault();
   toggleToDo();
})

addBtn.addEventListener('click', () => {
   event.preventDefault();
   addLi(inputs[0]);
})


// addBtn.addEventListener