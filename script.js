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
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        if(listContainer.children.length === 1){
            hline.style.display = 'block';
            linebr.style.display = 'block';
        }
    }
    inputBox.value = "";
    saveData();
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
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
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