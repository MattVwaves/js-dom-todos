const toDoUl = document.querySelector('ul')
const completedButtonUl = document.getElementsByTagName("ul")[1]
const deleteButtonUl = document.getElementsByTagName("ul")[2]

console.log(completedButtonUl)

const state = {
    toDos: [],
  };

// load todos
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

// post new todo
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
// render list
function render(){
    toDoUl.innerHTML = ''
    state.toDos.forEach((todo) =>{
        
        const newToDo = document.createElement('li')
        newToDo.innerText = todo.title
        if (todo.completed === true){
        newToDo.setAttribute('style', 'text-decoration: line-through')
        }
        toDoUl.appendChild(newToDo)

        const completed = document.createElement('li')
            completed.setAttribute('class', 'completed-button')
            completedButtonUl.appendChild(completed)

        const deleteLi = document.createElement('li')
            deleteLi.setAttribute('class', 'delete-button')
            delButton = document.createElement('button')
            delButton.innerText = 'DEL'

            delButton.addEventListener ('click', ()=>{
                const uri = `http://localhost:3000/todos/${todo.id}`
                const options = {
                    method: 'DELETE',
                    headers: {"Content-Type": "application/json"},
                }
                fetch(uri, options)
                .then((response)=>{
                    return response.json()
                })
            })

            deleteLi.appendChild(delButton)
            deleteButtonUl.appendChild(deleteLi)
        
        if (todo.completed === false){
            const setAsComplete = document.createElement('button')
            completed.append(setAsComplete)
            setAsComplete.innerText = 'DONE'
            setAsComplete.addEventListener('click', (event) => {
                event.preventDefault(event)
            
                const uri = `http://localhost:3000/todos/${todo.id}`
                const newStatus = {
                    completed: true
                }
                const options = {
                    method: 'PATCH',
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(newStatus)
                }
                fetch(uri, options)
                .then((response)=>{
                    return response.json()
                })
                .then((updatedToDo)=>{
                    console.log(updatedToDo)
                })
            })
        }
        else {
            completed.innerText = 'not'
            completed.setAttribute('style', 'color: white')
        }
    })
}


