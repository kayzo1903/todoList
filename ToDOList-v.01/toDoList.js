//Task container
const openTask = document.querySelector('.add-btn')
const taskContainer = document.querySelector('.task-sub')
const closeTaskCont = document.querySelector('.close-task-cont')

openTask.addEventListener("click", open)
closeTaskCont.addEventListener('click', open)
function open() {
    taskContainer.classList.toggle('open')
    initialValue()
}

//submit the task
const taskInput = document.getElementById('task-input')
const setTime = document.getElementById('set-time')
const taskSubmit = document.getElementById('task-submit')
const mainTaskcontainer = document.querySelector('.main-task-container')

//Edit flag
let editFlag = false
let editId = ""
let editElement ;

taskSubmit.addEventListener('click',()=>{
    const id = new Date().getTime().toString()
    let inputTask = taskInput.value
    let inputTime =  setTime.value
    let values = [taskInput.value,setTime.value]
    if (inputTask && inputTime && !editFlag) {
    itemsLoader (id, values)  
    open()
    initialValue()
    //set to local storage
    addToLocalStorage(id, values)
   }
   else if (inputTask && inputTime && editFlag) {
    editElement.children[0].innerHTML = inputTask
    editElement.children[1].innerHTML = inputTime
    let values = [inputTask,inputTime]
    editTolocalStorage(editId, values)
    initialValue()
    open()
   }  
   else{
    console.log('none above');
   }
})
//edit task
function  deleteTask(e) {
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id
    mainTaskcontainer.removeChild(element)
    removeFromLocalStorage(id)
}
//delete task
function editTask(e) {
    const element = e.currentTarget.parentElement.parentElement
    editElementTask = e.currentTarget.parentElement.parentElement.children[0]
    editElementTime = e.currentTarget.parentElement.parentElement.children[1]  
    taskInput.value = editElementTask.innerHTML
    setTime.value = editElementTime.innerHTML
    taskContainer.classList.add('open')
    editFlag = true;
    editId = element.dataset.id
    editElement = e.currentTarget.parentElement.parentElement
}

//clear All the task
const clearbtn = document.querySelector('.clear-btn')
clearbtn.addEventListener('click', clearAll)
function clearAll() {
    const items = document.querySelectorAll('.task-list-container')
    if (items.length > 0) {
        items.forEach(item =>{
            mainTaskcontainer.removeChild(item)
        })
    }
    localStorage.clear('list')
}

//local storage setup
function addToLocalStorage(id, value) {
    const grocery = {id, value }
    let items = getLocalStorage()
    items.push(grocery)
    localStorage.setItem('list', JSON.stringify(items))
}

function removeFromLocalStorage(id) {
  let items = getLocalStorage()
  items = items.filter(item=>{
     if (item.id !== id) {
        return item
     }
  })
  localStorage.setItem('list', JSON.stringify(items))
}

function editTolocalStorage(id, value){
      items = getLocalStorage()
      items = items.map(item=>{
        if (item.id === id) {
            item.value = value 
        }
        return item
      })
      localStorage.setItem('list', JSON.stringify(items))
}

function getLocalStorage() {
    return  localStorage.getItem('list')?JSON.parse(localStorage.getItem('list')):[]
}
//return to default
function initialValue() {
    taskInput.value = ""
    setTime.value =  ""
    let editId = ""
    editFlag = false 
    editElement; 
}

//loadITEMS
window.addEventListener('DOMContentLoaded', setupItems)
function setupItems() {
    let items = getLocalStorage()
   if (items.length > 0) {
     items.forEach(item=>{
        itemsLoader (item.id, item.value)
     })
   }
}
function itemsLoader (id, value) {
    const element = document.createElement('div')
    element.classList.add('task-list-container') 
    const attr = document.createAttribute('data-id')
    attr.value = id
    element.setAttributeNode(attr)
    element.innerHTML = 
    ` <p id="task">${value[0]}</p>
      <p id="task-time">${value[1]}</p>
        <div class="clear-task">
         <i class="fa fa-xmark delete" id='delete'></i>
         <i class="fa fa-pen-to-square edit" id='edit'></i>
        </div>
    `  
    element.querySelector('.delete').addEventListener('click', deleteTask)
    element.querySelector('.edit').addEventListener('click', editTask)
    mainTaskcontainer.appendChild(element)
}
//calender
const day = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
const month =['january','february','march','april','may','june','july','august','september','october','november','december']
let Time = [day[new Date().getDay()-1],month[new Date().getMonth()],new Date().getDate()]
const todayDate = document.querySelector('.today-date')
function calenderToday() {
    let dayTH = ''
    if (Time[2] === 1) {
        dayTH = 'st'
    }
    else if (Time[2] === 2 ) {
        dayTH = 'nd'
    }
    else if (Time[2] === 3) {
         dayTH = 'rd'
    }
    
    else if (Time[2] === 21 ) {
         dayTH = 'st'
    }
     else if (Time[2] === 22 ) {
         dayTH = 'nd'
     }
     else if (Time[2] === 23 ) {
         dayTH = 'rd'
    }
    else if (Time[2] === 31) {
         dayTH = 'st'
    }
    else  {
     dayTH = 'th'
    }
todayDate.innerHTML = `
<h3>${Time[0]},${Time[2]}<sup>${dayTH}</sup><br>
${Time[1]}</h3>`
}
calenderToday()




