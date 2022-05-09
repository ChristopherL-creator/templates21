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

//  metto null perché va rispettato ordine di proprietà; attingerà a valore default;
// const topolino = new DeadLineToDo('compra pane', null, ToDo.PRIORITY.Medium, ['tag5']);
// console.log(topolino.toString()); 

const toDoList = [todo1, todo2, paperino, paperina];  

function displayToDoWithTemplate() {
    const template = ` 
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

    <div id="done-container"> 

    </div>
    ` 
    const toDoListContainer = document.getElementById('todo-list-container'); 

    for (let i = 0; i < toDoList.length; i++) {
        const todo = toDoList[i]; 
        const div = document.createElement('div'); 
        
        const toDoTemplate = template.replace('#TODONAME', todo.name) 
                                     .replace('#CREATIONDATE', todo.creationDate.toISOString()); 
                
        div.innerHTML = toDoTemplate; 
        toDoListContainer.appendChild(div); 
//  aggiungo elementi unici;  

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

displayToDoWithTemplate();

// const doneList = [];

//  uno degli styles dipende dalla priority (bg-color, in base a priority); 
//  cercare come dare istruzioni stile a file js. 
//  aggiungo style.bgcolor inline a html;