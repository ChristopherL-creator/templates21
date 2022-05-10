const todo1 = new ToDo('Uscire', ToDo.PRIORITY.Medium, ['tag1']) 
todo1.creationDate = new Date(2022, 6, 22);
console.log(todo1.toString());  

const todo2 = new ToDo('heheh') 
//  per modificare proprietà;
todo2.creationDate = new Date(2022, 6, 22);
console.log(todo2.toString()); 

const paperino = new DeadLineToDo('manda mail', new Date(2022, 4, 7), ToDo.PRIORITY.High, ['tag2', ' tag3']); 
console.log(paperino.toString()); 

const paperina = new DeadLineToDo('manda mememel', new Date(2022, 6, 9), ToDo.PRIORITY.Max, ['tag4']); 
console.log(paperina.toString()); 

const toDoTemplate = ` 
<div class="todo-container"> 
    <div class="task-div"> 
        <div class="task-griglia"> 
            <span class = "titolo-container">#TODONAME</span> 
            <div class="task-flex"> 

            </div> 
            <div id='date-container' class="creation-container"> 
                    Da: #CREATIONDATE  
            </div> 
            <div class = "button-container">
                <button class="button">COMPLETATO</button> 
            </div>
        </div> 
     </div>
</div> 
` 

const doneTemplate = ` 
<div class="todo-container"> 
    <div class="task-div"> 
        <div class="task-griglia"> 
            <span class = "titolo-container">#TODONAME</span> 
            <div class="task-flex"> 

            </div> 
            <div id='date-container' class="creation-container"> 
                    Da: #CREATIONDATE  
            </div> 
        </div> 
     </div>
</div> 
` 

//  metto null perché va rispettato ordine di proprietà; attingerà a valore default;
// const topolino = new DeadLineToDo('compra pane', null, ToDo.PRIORITY.Medium, ['tag5']);
// console.log(topolino.toString()); 

let toDoList = [todo1, todo2, paperino, paperina];  

const doneList = []; 

function displayToDoWithTemplate(template, containerName, toDoArray) {

    const mainContainer = document.getElementById(containerName); 

    mainContainer.innerHTML = '';

    for (let i = 0; i < toDoArray.length; i++) {
        const todo = toDoArray[i]; 
        const div = document.createElement('div'); 
        
        const toDoTemplate = template.replace('#TODONAME', todo.name) 
                                     .replace('#CREATIONDATE', todo.creationDate.toISOString()); 
                
        div.innerHTML = toDoTemplate; 
        mainContainer.appendChild(div); 
//  aggiungo elementi unici;  

        const doneButton = div.querySelector('.button');  
//  richiamo bottone;
        if (doneButton) { 
//  se bottone presente, avvio funzioni;
            doneButton.style.backgroundColor = todo.priority.color; 
            doneButton.onclick = () => removeDoneToDo(todo); 
        }
  
//      gli ho passato lambda;
//  quando passo formula in javascript, lo faccio senza parentesi; 

//      per cambiare colore in base a priorità
        const toDoContainer = div.querySelector('.task-div'); 
        toDoContainer.style.backgroundColor = todo.priority.color;

        if (todo.deadLine) {
            // const dateContainer = document.getElementsByClassName('creation-container')[0]; 
            const dateContainer = div.querySelector('.creation-container');
            const dateSpan = document.createElement('div'); 
            const dateNode = document.createTextNode('a: ' + todo.deadLine.toISOString()); 
            dateSpan.appendChild(dateNode); 
            dateContainer.appendChild(dateSpan);
        } 

        const tagContainer = div.querySelector('.task-flex');
        for (const tag of todo.tags) {
            const tagSpan = document.createElement('div');  
            const node = document.createTextNode(tag); 
            tagSpan.classList.add('tags-items')
            tagSpan.appendChild(node); 
            tagContainer.appendChild(tagSpan);
        }
    }
} 

// displayToDoWithTemplate(); 


// function displayDoneWithTemplate() {
//     const template = ` 
//     <div class="todo-container"> 
//         <div class="task-div"> 
//             <div class="task-griglia"> 
//                 <span class = "titolo-container">#TODONAME</span> 
//                 <div class="task-flex"> 

//                 </div> 
//                 <div id='date-container' class="creation-container"> 
//                         Da: #CREATIONDATE  
//                 </div> 
//             </div> 
//          </div>
//     </div> 

//     <div id="done-container"> 

//     </div>
//     ` 
//     const doneContainer = document.getElementById('done-container'); 

//     doneContainer.innerHTML = ''

//     for (let i = 0; i < doneList.length; i++) {
//         const todo = doneList[i]; 
//         const div = document.createElement('div'); 
        
//         const toDoTemplate = template.replace('#TODONAME', todo.name) 
//                                      .replace('#CREATIONDATE', todo.creationDate.toISOString()); 
                
//         div.innerHTML = toDoTemplate; 
//         doneContainer.appendChild(div); 
// //  aggiungo elementi unici;  

//         if (todo.deadLine) {
//             // const dateContainer = document.getElementsByClassName('creation-container')[0]; 
//             const dateContainer = div.querySelector('.creation-container');
//             const dateSpan = document.createElement('div'); 
//             const dateNode = document.createTextNode('a: ' + todo.deadLine.toISOString()); 
//             dateSpan.appendChild(dateNode); 
//             dateContainer.appendChild(dateSpan);
//         } 

//         const tagContainer = div.querySelector('.task-flex');
//         for (const tag of todo.tags) {
//             const tagSpan = document.createElement('div');  
//             const node = document.createTextNode(tag); 
//             tagSpan.classList.add('tags-items')
//             tagSpan.appendChild(node); 
//             tagContainer.appendChild(tagSpan);
//         }
//     }
// } 

displayToDoWithTemplate(toDoTemplate, 'todo-list-container', toDoList);

function removeDoneToDo(todo){
    toDoList = toDoList.filter(t => t.name !== todo.name); 
    displayToDoWithTemplate(toDoTemplate, 'todo-list-container', toDoList); 
    doneList.push(todo); 
    displayToDoWithTemplate(doneTemplate, 'done-container', doneList);
} 

function orderByName(){ 
    toDoList.sort(compareByName); 
    displayToDoWithTemplate(toDoTemplate, 'todo-list-container', toDoList); 
    doneList.sort(compareByName); 
    displayToDoWithTemplate(doneTemplate, 'done-container', doneList);
} 

function compareByName(todo1, todo2) {
    return todo1.name.localeCompare(todo2.name); 
} 

function orderByDate() {
    toDoList.sort(compareByDate); 
    displayToDoWithTemplate(toDoTemplate, 'todo-list-container', toDoList); 
    doneList.sort(compareByDate); 
    displayToDoWithTemplate(doneTemplate, 'done-container', doneList);
} 

function compareByDate(todo1, todo2) {
    return todo1.creationDate.getTime() - todo2.creationDate.getTime(); 
} 

const dateButton = document.getElementById('date-order-btn'); 
dateButton.onclick = orderByDate;