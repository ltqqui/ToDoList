import { ToDo } from "./Work.js";

let arrTodo = [];
let task = new ToDo();
let newComplete = new ToDo();
let arrComPlete = [];

document.querySelector("#addItem").onclick = () => {
  let name = String(document.querySelector("#newTask").value);
  let id = String(Date.now());
  arrTodo.push();
  if (name.trim() == 0) {
    alert("Nhập vào công việc ");
  } else {
    task = { id, name };
    arrTodo.push(task);
    document.querySelector("#newTask").value = "";
    console.log(arrTodo);
    renderList(arrTodo);
    setLocalStorage(arrTodo, "ToDo");
  }
};

let renderList = (array) => {
  let html = "";
  for (let newTask of array) {
    html += `
    <li>
    <p>${newTask.name}</p>                 
    <div class="buttons">
    <button class="remove" onclick="deleteWork('${newTask.id}')" >
    <i class="far fa-trash-alt"></i>
    </button>
    <button class="complete" onclick="completeWork('${newTask.id}')">
    <i class="fas fa-check-circle"></i>
    </button>
    </div>
    </li>
    `;
  }
  console.log(array);
  document.querySelector("#todo").innerHTML = html;
  document.querySelector("#newTask").value = "";
};

window.deleteWork = (idDelete) => {
  arrTodo = arrTodo.filter((todo) => todo.id !== idDelete);
  setLocalStorage(arrTodo, "ToDo");
  renderList(arrTodo);
};

//complte

let renderComplete = (array) => {
  let html = "";
  for (let newTask of array) {
    html += `
    <li>
    <p>${newTask.name}</p>                 
    <div class="buttons">
    <button class="remove" onclick="deleteCompleted('${newTask.id}')" >
    <i class="far fa-trash-alt"></i>
    </button>
    <button class="complete">
    <i class="fas fa-check-circle"></i>
    </button>
    </div>
    </li>
    `;
  }
  console.log(array);
  document.querySelector("#completed").innerHTML = html;
  document.querySelector("#newTask").value = "";
};

window.completeWork = (idComplete) => {
  newComplete = arrTodo.find((complete) => complete.id == idComplete);
  arrComPlete.unshift(newComplete);
  deleteWork(idComplete);
  setLocalStorage(arrComPlete, "completed");
  renderComplete(arrComPlete);
};

window.deleteCompleted=(idDelete)=>{
  arrComPlete = arrComPlete.filter((completed) => completed.id !== idDelete);
  setLocalStorage(arrComPlete,"completed");
  renderComplete(arrComPlete);
}

let setLocalStorage = (ob, key) => {
  let str = JSON.stringify(ob);
  localStorage.setItem(key, str);
};
let getLocalStorage = (key) => {
  if (localStorage.getItem(key)) {
    let str = localStorage.getItem(key);
    if (key == "ToDo") arrTodo = JSON.parse(str);
    else arrComPlete = JSON.parse(str);
    // arrComPlete=JSON.parse(str);
  }
};



document.querySelector("#two").onclick = () => {
  let kt;
  for (let i = 0; i < arrTodo.length; i++) {
    for (let j = i + 1; j < arrTodo.length; j++) {
      if (arrTodo[i].name.toLowerCase() > arrTodo[j].name.toLowerCase()) {
        let temp = arrTodo[i];
        arrTodo[i] = arrTodo[j];
        arrTodo[j] = temp;
      }
    }
  }
  renderList(arrTodo);
};

document.querySelector("#three").onclick = () => {
  arrTodo.reverse();
  renderList(arrTodo);
};

window.onload = () => {
  getLocalStorage("ToDo");
  renderList(arrTodo);
  getLocalStorage("completed");
  renderComplete(arrComPlete);
};
