let arrWork=[];
document.querySelector("#addItem").onclick = function createTask(){
    let myTaskToDo=new Work()
    myTaskToDo.name=document.querySelector('#newTask').value;
    myTaskToDo.id=arrWork.length;
    if(myTaskToDo.name!=""){
      arrWork.push(myTaskToDo)
    }
    else 
    alert("Nhập công việc")
    renderTask(arrWork);
    document.querySelector('#newTask').value=''
} 
// DO TO
let renderTask=(array)=>{
  let html = "";
  for (let task of array) {
    html += `
      <li>
          <p>${task.name}</p>                 
          <div class="buttons">
          <button class="remove" onclick="deleteWorkToDo('${task.id}')" >
          <i class="far fa-trash-alt"></i>
          </button>
          <button class="complete" onclick="completeWorkToDo('${task.id}')">
          <i class="fas fa-check-circle"></i>
          </button>
          </div>
      </li>
      
      `;
  }
  document.querySelector("#todo").innerHTML = html;
  saveLocalStorage(array,"ToDo");
}


let deleteWorkToDo=(idDelete)=>{
  // for(let task of arrWork){
  //   if(task.id==idDelete){
  //     console.log(task.id)
  //    arrWork.splice(task,1)
  //   }
  //   // console.log(idDelete)
  // }
  let indexDel=-1;
    for(let index=0;index<arrWork.length;index++){
        if(arrWork[index].id==idDelete ){
            indexDel=index;
            break;
        }
    }
    if(indexDel!==-1){
        arrWork.splice(indexDel,1)
    }
  renderTask(arrWork);
  saveLocalStorage(arrWork,"ToDo");
}


let arrComplete= [];
let completeWorkToDo= (idComplete)=>{
//   for(let task of arrWork){
//     if(task.id==idComplete){
//      renderTask(arrWork);
//      arrComplete.push(task)  
//      arrWork.splice(task,1) 
//     console.log(arrWork);
// console.log(arrComplete)
//     }
  for(let i=0;i<arrWork.length;i++){
    if(arrWork[i].id==idComplete){
      arrComplete.push(arrWork[i]);
      arrWork.splice(i,1);
    }
  }

  saveLocalStorage(arrWork,"ToDo");
  saveLocalStorage(arrComplete,"Complete")



renderTask(arrWork);
renderCompleted(arrComplete)
  }


  // renderCompleted(arrComplete);
  // saveLocalStorage(arrWork,"ToDo");
  // saveLocalStorage(arrComplete,"Complete");



// COMPLETE

let renderCompleted=(array)=>{
  let html = "";
  for (let task of array) {
    html += `
      <li>
          <p>${task.name}</p>                 
          <div class="buttons">
          <button class="remove" onclick="deleteWorkComplete(${ task.id})" >
          <i class="far fa-trash-alt"></i>
          </button>
          <button class="complete">
          <i class="fas fa-check-circle"></i>
          </button>
          </div>
      </li>
      
      `;
  }
  document.querySelector("#completed").innerHTML = html;
  saveLocalStorage(array,"Complete");
}

let deleteWorkComplete=(idDelete)=>{
  for(let task of arrComplete){
    if(task.id==idDelete){
     arrComplete.splice(task,1)
    }
  }
  renderCompleted(arrComplete);
  saveLocalStorage(arrComplete,"Complete");
}


let saveLocalStorage=(ob,key)=>{
  // let str =JSON.stringify(ob);
  // localStorage.setItem(key,str);  
  let str=JSON.stringify(ob);
  localStorage.setItem(key, str);
}

let getLocalStorage=(key)=>{
  if(localStorage.getItem(key)){
    let str=localStorage.getItem(key);
    let ob=JSON.parse(str);
    return ob;
  }
  return undefined;
}

console.log(arrWork);
console.log(arrComplete)
window.onload=()=>{
  let arrToDo= getLocalStorage("ToDo");
  let arrCompleted=getLocalStorage("Complete")
  // console.log(arrToDo)
  renderTask(arrToDo);
  renderCompleted(arrCompleted);
  arrWork={...arrToDo}
  console.log(arrToDo);
  
}

