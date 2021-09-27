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

const arrayOfNotes = [];

function addNewNote() {
  arrayOfNotes.push({
    text: noteContent.value,
    feature: "none",
  });
  cancelNewNote();
  displayNotes(arrayOfNotes);
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
  container.innerHTML = "";
  array.map((item, index) => {
    container.innerHTML += `
        <div class="${item.feature}">
            <p>${item.text}</p>
            <div class="buttons">
              <div id="${index}com" class="completed">COMPLETED</div>
              <div id=${index}non class="uncompleted">UNCOMPLETED</div>
            </div>
          </div>
        `;
    document
      .getElementById(`${index}com`)
      .addEventListener("click", markAsCompleted);
    document
      .getElementById(`${index}non`)
      .addEventListener("click", markAsUnCompleted);
  });
}

function markAsCompleted(e) {
  console.log(e.target.id);
  let indexToChange = e.target.id.slice(0, 1);
  arrayOfNotes.map((item, index) => {
    indexToChange == index ? (item.feature = "completedColor") : null;
  });
  displayNotes(arrayOfNotes);
}

function markAsUnCompleted(e) {
  let indexToChange = e.target.id.slice(0, 1);
  arrayOfNotes.map((item, index) => {
    indexToChange == index ? (item.feature = "unCompletedColor") : null;
  });
  displayNotes(arrayOfNotes);
}
