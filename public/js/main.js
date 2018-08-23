var addBtn = document.getElementById("addBtn");
var toggleAllBtn = document.getElementById("toggleAllBtn");
var toggleToDoBtn = document.getElementById("toggleToDoBtn");
var toggleDoneBtn = document.getElementById("toggleDoneBtn");
var toggleDeletedBtn = document.getElementById("toggleDeletedBtn");
var ul = document.getElementById("ul");
var inputs = Array.from(document.getElementsByTagName("input"));
var regSp = /^\s*$/;
var regSp2 = /^\s*/;
var regUpperCase = /[a-z]{1}/;
var lis, previousClass, editInput, toDoList, doneList, deletedList, addToDoneBtns, addToDeletedBtns, editBtns;

function addLi(input) {
   if (!regSp.test(input.value)) {
      input.value = input.value.replace(input.value.match(regSp2)[0], "");
      if (regUpperCase.test(input.value)) {
         input.value = input.value.replace(input.value.match(regUpperCase)[0], input.value.match(regUpperCase)[0].toUpperCase());
      }
      ul.innerHTML += '<li class="' + input.etat + ' li row shown"><input type="text" value="' + input.value + '" class="col-9 noEdit mx-2 d-inline form-control" aria-describedby="helpId" readonly><div class="col-2 mx-auto d-inline"><button class="btn btn-light mx-1"><i class="mx-1 fas fa-edit" ></i></button><button class="btn btn-success mx-1"><i class="mx-2 fas fa-check-square"></i></button><button class="btn btn-secondary mx-1"><i class="mx-2 fas fa-trash-alt"></i></button></div></li>';
      addToDoneBtns = Array.from(document.getElementsByClassName("btn-success"));
      addToDeletedBtns = Array.from(document.getElementsByClassName("btn-secondary"));
      editBtns = Array.from(document.getElementsByClassName("btn-light"));
      lis = Array.from(document.getElementsByTagName("li"));
      lis.forEach(element => {
         if (!input.etat) {
            element.classList.add("to-do");
         }
         update();
      });
      addToDoneBtns.forEach(element => {
         element.addEventListener('click', () => {
            addToDone(element.parentElement.parentElement);
            update();
         })
      });
      addToDeletedBtns.forEach(element => {
         element.addEventListener('click', () => {
            addToDeleted(element.parentElement.parentElement);
            update();
         });
      })
      editBtns.forEach(element => {
         element.addEventListener('click', () =>
            edit(element.parentElement.parentElement))
      })
      input.value = "";
   }
}

function edit(elem) {
   let c = elem.lastElementChild.children;
   if (elem.firstElementChild.readOnly == true) {
      elem.firstElementChild.addEventListener("keydown", () => checkKey(elem));
      elem.firstElementChild.readOnly = false;
      elem.firstElementChild.focus();
      elem.firstElementChild.select();
      elem.firstElementChild.classList.remove("noEdit");
      //toggle ( DONE / DEL / + )Buttons
      for (i = 1; i < c.length; i++) {
         c[i].classList.add("edit");
         c[i].firstElementChild.classList.add("edit");
         c[i].firstElementChild.classList.remove("fas");
      }
      addBtn.classList.add("edit");
   } else {
      for (i = 1; i < c.length; i++) {
         c[i].classList.remove("edit");
         c[i].firstElementChild.classList.add("fas");
         c[i].firstElementChild.classList.remove("edit");
      }
      addBtn.classList.remove("edit");
      elem.firstElementChild.classList.add("noEdit");
      elem.firstElementChild.readOnly = true;
   }
}

function hide(elem) {
   elem.classList.remove("shown");
   elem.classList.add("hidden");
}

function show(elem) {
   elem.classList.remove("hidden");
   elem.classList.add("shown");
}

function update() {
   toDoList = Array.from(document.getElementsByClassName("to-do"));
   doneList = Array.from(document.getElementsByClassName("done"));
   deletedList = Array.from(document.getElementsByClassName("deleted"));
   toDoList.forEach(element => {
      if (toggleToDoBtn.classList.contains("active") == true) {
         show(element);
      } else {
         hide(element);
      };
   })
   doneList.forEach(element => {
      if (toggleDoneBtn.classList.contains("active") == true) {
         show(element);
      } else {
         hide(element);
      };
   })
   deletedList.forEach(element => {
      if (toggleDeletedBtn.classList.contains("active") == true) {
         show(element);
      } else {
         hide(element);
      }
   })
}

function toggleAll() {
   if (toggleToDoBtn.classList.contains("active") == false) {
      toggleToDo();
      toggleToDoBtn.classList.add("active");
   }
   if (toggleDeletedBtn.classList.contains("active") == false) {
      toggleDone();
      toggleDoneBtn.classList.add("active");
   }
   if (toggleDeletedBtn.classList.contains("active") == false) {
      toggleDeleted();
      toggleDeletedBtn.classList.add("active");
   }
}

function toggleToDo() {
   toDoList = Array.from(document.getElementsByClassName("to-do"));
   if (toggleToDoBtn.classList.contains("active") == true) {
      toDoList.forEach(element => {
         hide(element);
      });
   } else {
      toDoList.forEach(element => {
         show(element);
      });
   }
}

function toggleDone() {
   doneList = Array.from(document.getElementsByClassName("done"));
   if (toggleDoneBtn.classList.contains("active") == true) {
      doneList.forEach(element => {
         hide(element);
      });
   } else {
      doneList.forEach(element => {
         show(element);
      });
   }
}

function toggleDeleted() {
   deletedList = Array.from(document.getElementsByClassName("deleted"));
   if (toggleDeletedBtn.classList.contains("active") == true) {
      deletedList.forEach(element => {
         hide(element);
      });
   } else {
      deletedList.forEach(element => {
         show(element);
      });
   }
}

function addToDone(elem) {
   if (elem.classList.contains("done") == true) {
      elem.classList.remove("done");
      elem.classList.add("to-do");
   } else {
      elem.classList.remove("deleted");
      elem.classList.remove("to-do");
      elem.classList.add("done");
   }
}

function addToDeleted(elem) {
   if (elem.classList.contains("deleted") == false) {
      if (elem.classList.contains("to-do") == true && elem.classList.contains("done") == false) {
         previousClass = "to-do";
         elem.classList.remove("to-do");
         elem.classList.add("deleted");
      } else {
         previousClass = "done";
         elem.classList.remove("done");
         elem.classList.add("deleted");
      }
   } else {
      elem.classList.remove("deleted");
      elem.classList.add(previousClass);
   }
}

function checkKey(input) {
   if (window.event.keyCode == '13') {
      if (input.classList.contains("li") === true) {
         edit(input);
      } else {
         addLi(input);
      }
   }
}

addBtn.addEventListener("click", () => addLi(inputs[0]));
inputs[0].addEventListener("keydown", () => checkKey(inputs[0]));
toggleToDoBtn.addEventListener('click', toggleToDo);
toggleDoneBtn.addEventListener('click', toggleDone);
toggleDeletedBtn.addEventListener('click', toggleDeleted);
toggleAllBtn.addEventListener('click', toggleAll);
axios.get('base.json').then(function (response) {
   Array.from(response.data).forEach(element => addLi(element));
})

// A FAIRE
//
//  LOUPE MOUSEOVER : APPRENDRE JQUERY (ex: ZOOMPLE - LEROY ZOOM - BLOWUP.JS - MAGNIFY JS)
// Dans Json : Check recup = () => this.name;
// DRAG N DROP