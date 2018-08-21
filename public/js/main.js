var addBtn = document.getElementById("addBtn");
var toggleToDoBtn = document.getElementById("toggleToDoBtn");
var toggleDoneBtn = document.getElementById("toggleDoneBtn");
var toggleDeletedBtn = document.getElementById("toggleDeletedBtn");
var ul = document.getElementById("ul");
var lis = Array.from(document.getElementsByTagName("li"));
var form = document.getElementById("form");
var inputs = Array.from(document.getElementsByTagName("input"));
var regSp = /^\s*$/;
var onOff = "on";
var i = 0;
var previousClass;
var editInput;
var toDoList;
var doneList;
var deletedList;
var addToDoneBtns;
var addToDeletedBtns;
var editBtns;

function addLi(input) {
   var tested = regSp.test(input.value);
   if (!tested) {
      ul.innerHTML += '<li id="li' + i + '" class="to-do p-3" ><input id="editInput" class="noEdit" readonly mx-4" type="text" placeholder="' + input.value + '"><button class="btn btn-success"><i class="mx-3 fas fa-check-square"></i></button><button class="btn btn-primary"><i class="mx-3 fas fa-edit"></i></button><button class="btn btn-danger"><i class="mx-3 fas fa-trash-alt"></i></button></li>';
      addToDoneBtns = Array.from(document.getElementsByClassName("btn-success"));
      addToDeletedBtns = Array.from(document.getElementsByClassName("btn-danger"));
      editBtns = Array.from(document.getElementsByClassName("btn-primary"));
      // let li = document.getElementById("li" + i);

      addToDoneBtns.forEach(element => {
         element.addEventListener('click', () => {
            addToDone(element.parentElement);
            update(element.parentElement);
         })
      });
      addToDeletedBtns.forEach(element => {
         element.addEventListener('click', () => {
            addToDeleted(element.parentElement);
            update(element.parentElement);
         });
      })
      editBtns.forEach(element => {
         element.addEventListener('click', () => {
            edit(element.parentElement);
         })
      });
      i++;
      input.value = "";

   }
}

function edit(elem) {
   // console.log(elem);
   if (elem.firstElementChild.readOnly == true) {
      elem.firstElementChild.readOnly = false;
      elem.firstElementChild.focus();
      elem.firstElementChild.classList.remove("noEdit");
      elem.firstElementChild.classList.add("edit");
   } else {
      elem.firstElementChild.classList.remove("edit");
      elem.firstElementChild.classList.add("noEdit");
      elem.firstElementChild.readOnly = true;
   }
}

function update(elem) {
   // check if the li(parent of the button) is in an active list(toDo, Done, Deleted), and displays/hides it.
   toDoList = Array.from(document.getElementsByClassName("to-do"));
   doneList = Array.from(document.getElementsByClassName("done"));
   deletedList = Array.from(document.getElementsByClassName("delete"));
   toDoList.forEach(element => {
      if (toggleToDoBtn.classList.contains("active") == true) {
         element.classList.remove("d-none");
         element.classList.add("d-block");
      } else {
         element.classList.remove("d-block");
         element.classList.add("d-none");
      };
   })
   doneList.forEach(element => {
      if (toggleDoneBtn.classList.contains("active") == true) {
         element.classList.remove("d-none");
         element.classList.add("d-block");
      } else {
         element.classList.remove("d-block");
         element.classList.add("d-none");
      };
   })
   deletedList.forEach(element => {
      if (toggleDeletedBtn.classList.contains("active") == true) {
         element.classList.remove("d-none");
         element.classList.add("d-block");
      } else {
         element.classList.remove("d-block");
         element.classList.add("d-none");
      }
   })
}

function toggleToDo() {
   toDoList = Array.from(document.getElementsByClassName("to-do"));
   if (toggleToDoBtn.classList.contains("active") == true) {
      toDoList.forEach(element => {
         element.classList.add("d-none");
         element.classList.remove("d-block");
      });
   } else {
      toDoList.forEach(element => {
         element.classList.add("d-block");
         element.classList.remove("d-none");
      });
   }
}

function toggleDone() {
   doneList = Array.from(document.getElementsByClassName("done"));
   if (toggleDoneBtn.classList.contains("active") == true) {
      doneList.forEach(element => {
         element.classList.add("d-none");
         element.classList.remove("d-block");
      });
   } else {
      doneList.forEach(element => {
         element.classList.add("d-block");
         element.classList.remove("d-none");
      });
   }
}

function toggleDeleted() {
   deletedList = Array.from(document.getElementsByClassName("deleted"));
   if (toggleDeletedBtn.classList.contains("active") == true) {
      deletedList.forEach(element => {
         element.classList.add("d-none");
         element.classList.remove("d-block");
      });
   } else {
      deletedList.forEach(element => {
         element.classList.add("d-block");
         element.classList.remove("d-none");
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
// ADD CARD
addBtn.addEventListener("click", () => {
   addLi(inputs[0]);
})
// TOGGLE TO DO
toggleToDoBtn.addEventListener('click', () => {
   toggleToDo();
})
// TOGGLE DONE
toggleDoneBtn.addEventListener('click', () => {
   toggleDone();
})
// TOGGLE DELETED
toggleDeletedBtn.addEventListener('click', () => {
   toggleDeleted();
})

// UPDATE
// lis.forEach(element => {
//    element.children[]
// });