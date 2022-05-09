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


const toDoList = [todo1, todo2, paperino, paperina];  


function displayToDoWithTemplate(){

 const template = `
    <div class="todo-item">
    <div class="name-container">
        <span>#NAME</span>
    </div>
    <div class="tag-container">
    
    </div>
    <div class="date-container">
        <span class="creation-container">#CREATIONDATE</span>
       
    </div>
    <button class="button">Completato</button>

</div>
`
const toDoListContainer = document.getElementById('list-container'); 

    for (let i = 0; i < toDoList.length; i++) {
        const todo = toDoList[i];
        
        const div = document.createElement('div'); 
        const toDoTemplate = template.replace('#NAME', todo.name) 
                                     .replace('#CREATIONDATE', todo.creationDate.toISOString()); 

        div.innerHTML = toDoTemplate; 
        toDoListContainer.appendChild(div); 

        const toDoContainer = div.querySelector('.task-div'); 
        toDoContainer.style.backgroundColor = todo.priority.color;

        if (todo.deadLine) {
            // const dateContainer = document.getElementsByClassName('creation-container')[0]; 
            const dateContainer = div.querySelector('.creation-container');
            const dateSpan = document.createElement('span'); 
            const dateNode = document.createTextNode(todo.deadLine.toISOString()); 
            dateSpan.appendChild(dateNode); 
            dateContainer.appendChild(dateSpan);
        } 
        
        const tagContainer = div.querySelector('.task-flex');
        for (const tag of todo.tags) {
            const tagSpan = document.createElement('span'); 
            const node = document.createTextNode(tag); 
            tagSpan.classList.add('tags-items')
            tagSpan.appendChild(node); 
            tagContainer.appendChild(tagSpan);
        }
    }


}