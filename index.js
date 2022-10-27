const toDoUl = document.querySelector('ul')

const state = {
    toDos: [],
  };

function loadTodos(){
    const uri = "http://localhost:3000/todos"
    fetch(uri)
        .then((response) => {
            return response.json()
        })
        .then((toDos) =>{
            state.toDos = toDos
            render()
        })
}
loadTodos()

const submit = document.getElementsByTagName("input")[1]
const nameBox = document.getElementsByTagName("input")[0]

console.log(state)

submit.addEventListener('click', (event) => {
    event.preventDefault()

    const uri = "http://localhost:3000/todos"
    const newToDo = {
        title: nameBox.value,
        completed: false
    }
    const options = {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newToDo),
    }
    fetch(uri, options)
    .then((response) => {
        return response.json()
    })
    .then((newToDo) => {
        console.log(newToDo)
    })
    render()
})


function render(){
    toDoUl.innerHTML = ''
    state.toDos.forEach((todo) =>{
        const newToDo = document.createElement('li')
        newToDo.innerText = todo.title
        if (todo.completed === true){
        newToDo.setAttribute('style', 'text-decoration: line-through')
        }
        toDoUl.appendChild(newToDo)
    })
}


