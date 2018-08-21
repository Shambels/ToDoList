var addBtn = document.getElementById("addBtn");
var toggleToDoBtn = document.getElementById("toggleToDoBtn");
var toggleDoneBtn = document.getElementById("toggleDoneBtn");
var toggleDeletedBtn = document.getElementById("toggleDeletedBtn");
var ul = document.getElementById("ul");
var form = document.getElementById("form");
var inputs = Array.from(document.getElementsByTagName("input"));
var regSp = /^\s*$/;
var onOff = "on";
var i = 0;
var previousClass;
var editInput;

function addLi(input) {
   var tested = regSp.test(input.value);
   if (!tested) {
      ul.innerHTML += '<li id="li' + i + '" class="to-do" ><input id="editInput" class="" readonly mx-4" type="text" placeholder="' + input.value + '"><span id="cardSpan class="d-block text-primary mx-4" >' + input.value + '</span><button class="btn btn-success"><i class="mx-3 fas fa-check-square"></i></button><button class="btn btn-primary"><i class="mx-3 fas fa-edit"></i></button><button class="btn btn-danger"><i class="mx-3 fas fa-trash-alt"></i></button></li>';
      var AddToDoneBtns = Array.from(document.getElementsByClassName("btn-success"));
      var AddToDeletedBtns = Array.from(document.getElementsByClassName("btn-danger"));
      var editBtns= Array.from(document.getElementsByClassName("btn-primary"));
      let li = document.getElementById("li" + i);

      AddToDoneBtns.forEach(element => {
         element.addEventListener('click', () => {
            addToDone(element.parentElement);
            update(element.parentElement);
         })
      });
      AddToDeletedBtns.forEach(element => {
         element.addEventListener('click', () => {
            addToDeleted(element.parentElement);
            update(element.parentElement);
         });
      })
      editBtns.forEach(element => {
         element.addEventListener('click',()=> {
            edit(element.parentElement);
         })
      });
      i++;
      input.value = "";

   }
}
function edit(elem){
   if(elem.firstElementChild.readOnly==true){
   elem.firstElementChild.readOnly=false;
   console.log(elem.firstElementChild.readOnly)
   }
}

function update(elem) {
   // check if button.parentElement is in an active list(toDo, Done, Deleted), and display/hide it.
   // toDoList = Array.from(document.getElementsByClassName("to-do"))
   if (elem.classList.contains("to-do") == true) {
      if(toggleToDoBtn.getAttribute("aria-pressed") == true) {
         elem.classList.remove("d-none");
         elem.classList.add("d-block");
      } else {
         elem.classList.remove("d-block");
         elem.classList.add("d-none");
      }
   } if (elem.classList.contains("done") == true) {
         if(toggleDoneBtn.getAttribute("aria-pressed") == true) {
         elem.classList.remove("d-none");
         elem.classList.add("d-block");
      } else {
         elem.classList.remove("d-block");
         elem.classList.add("d-none");
      }
   } if (elem.classList.contains("deleted") == true) {
         if(toggleDeletedBtn.getAttribute("aria-pressed") == true) {
         elem.classList.remove("d-none");
         elem.classList.add("d-block");
      } else {
         elem.classList.remove("d-block");
         elem.classList.add("d-none");
      }
   }
}

function toggleToDo() {
   var toDoList = Array.from(document.getElementsByClassName("to-do"));
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
   var doneList = Array.from(document.getElementsByClassName("done"));
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
   var deletedList = Array.from(document.getElementsByClassName("deleted"));
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
   // update(elem.parentElement);
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
   // update(elem.parentElement);
}
// ADD CARD
addBtn.addEventListener("click" ,() => {
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