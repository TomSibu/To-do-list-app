const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const hline = document.getElementById("hline");
const linebr = document.getElementById("linebr");

function addTask(){
    if(inputBox.value === ''){
        alert("Empty Task is not allowed! Enter a task.")
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        li.draggable = true;
        li.addEventListener("dragstart", handleDragStart);
        li.addEventListener("dragover", handleDragOver);
        li.addEventListener("drop", handleDrop);
        li.addEventListener("dragend", handleDragEnd);

        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        span.addEventListener("click",function (){
            li.remove();
            saveData();
            lineBreak();
        });
        li.appendChild(span);

        if(listContainer.children.length === 1){
            hline.style.display = 'block';
            linebr.style.display = 'block';
        }
    }
    inputBox.value = "";
    saveData();
}

let draggedElement = null;
function handleDragStart(e){
    draggedElement = this;
    this.classList.add("dragging");
}

function handleDragOver(e) {
    e.preventDefault();
    const draggingOver = getDraggingOverElement(this,e.clientY);
    if(draggingOver && draggingOver != draggedElement){
        listContainer.insertBefore(draggedElement, draggingOver);
    }
    else if(!draggingOver){
        listContainer.appendChild(draggedElement);
    }
}

function handleDrop(){
    saveData();
}

function handleDragEnd(){
    this,classList.remove("dragging");
    saveData();
}

function getDraggingOverElement(target,mouseY){
    const elements = Array.from(listContainer.children).filter(el => el !== draggedElement);
    let draggingOver = elements.find(el => {
        const rect = el.getBoundingClientRect();
        return mouseY < rect.top + rect.height/2;
    })
    return draggingOver || null;
}

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
    lineBreak()
}, false);

inputBox.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        addTask();
    }
});

function saveData(){
    const tasks = Array.from(listContainer.children).map(item => item.innerHTML.split('<span')[0].trim());
    localStorage.setItem("data", JSON.stringify(tasks));
}

function showTask(){
    const savedTasks = JSON.parse(localStorage.getItem("data") || "[]");
    savedTasks.forEach(task => createTaskElement(task));
    lineBreak()
}

function lineBreak(){
    if(listContainer.children.length === 0){
        hline.style.display ='none';
        linebr.style.display = 'none';
    }
    else{
        hline.style.display = 'block';
        linebr.style.display = 'block';
    }
}

showTask();