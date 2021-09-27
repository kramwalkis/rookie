const addNew = document.getElementById("addNew");
const newNote = document.getElementById("newNote");
const backDrop = document.getElementById("backDrop");
const cancel = document.getElementById("cancel");
const addToNotes = document.getElementById("addToNotes");
const noteContent = document.getElementById("noteContent");
const container = document.getElementById("container");

addNew.addEventListener("click", showInput);
cancel.addEventListener("click", cancelNewNote);
addToNotes.addEventListener("click", addNewNote);

let arrayOfNotes = [];

localStorage.getItem("arrayOfNotes")
  ? (arrayOfNotes = JSON.parse(localStorage.getItem("arrayOfNotes")))
  : null;

displayNotes(arrayOfNotes);

function addNewNote() {
  if (noteContent.value) {
    arrayOfNotes.push({
      text: noteContent.value,
      feature: "none",
    });
    if (localStorage.getItem("arrayOfNotes")) {
      localStorage.setItem("arrayOfNotes", JSON.stringify(arrayOfNotes));
    } else {
      localStorage.setItem(
        "arrayOfNotes",
        JSON.stringify([{ text: noteContent.value, feature: "none" }])
      );
    }
    cancelNewNote();
    displayNotes(arrayOfNotes);
  } else {
    alert("Please enter a note, or click cancel");
  }
}

function cancelNewNote() {
  noteContent.value = "";
  newNote.style.display = "none";
  backDrop.style.display = "none";
}

function showInput() {
  newNote.style.display = "block";
  backDrop.style.display = "block";
}

function displayNotes(array) {
  console.log(array);
  container.innerHTML = "";
  array.map((item, index) => {
    container.innerHTML += `
        <div class="${item.feature} card">
            <p>${item.text}</p>
            <div class="buttons">
              <div id="${index}com" class="completed">COMPLETED</div>
              <div id=${index}non class="uncompleted">UNCOMPLETED</div>
            </div>
          </div>
        `;
  });
  addColors(".completed", markAsCompleted);
  addColors(".uncompleted", markAsUnCompleted);
}

function addColors(className, functionName) {
  [...document.querySelectorAll(className)].map((item) => {
    item.addEventListener("click", functionName);
  });
}

function markAsCompleted(e) {
  let indexToChange = e.target.id.slice(0, 1);
  arrayOfNotes.map((item, index) => {
    indexToChange == index ? (item.feature = "completedColor") : null;
  });
  localStorage.setItem("arrayOfNotes", JSON.stringify(arrayOfNotes));
  displayNotes(arrayOfNotes);
}

function markAsUnCompleted(e) {
  let indexToChange = e.target.id.slice(0, 1);
  arrayOfNotes.map((item, index) => {
    indexToChange == index ? (item.feature = "unCompletedColor") : null;
  });
  localStorage.setItem("arrayOfNotes", JSON.stringify(arrayOfNotes));
  displayNotes(arrayOfNotes);
}
