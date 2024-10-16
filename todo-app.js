let todos = []

const filters = {
    searchText: '',
    hideCompleted: false
}

// Check for existing todos data
const todosJSON = localStorage.getItem('todos')

if(todosJSON !== null){
    todos = JSON.parse(todosJSON)
}

const renderTodos = function(todos, filters, hideCompleted){
    const filteredTodos = todos.filter(function(todo){
        return todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    const incompleteTodos = filteredTodos.filter(function(todo){
        return !todo.completed
    })

    document.querySelector('#todos').innerHTML = ''
    
    const summary = document.createElement('h2')
    summary.textContent = `You have ${incompleteTodos.length} todos left`
    
    document.querySelector('#todos').appendChild(summary)

    if(filters.hideCompleted){
        incompleteTodos.forEach(function(todo){
        
            const todoEl = document.createElement('p')
            todoEl.textContent = todo.text
        
            document.querySelector('#todos').appendChild(todoEl)
            
        })
    }else {

        filteredTodos.forEach(function(todo){
        
            const todoEl = document.createElement('p')
            todoEl.textContent = todo.text
        
            document.querySelector('#todos').appendChild(todoEl)
            
        })
    }
}

renderTodos(todos, filters)

// Filter todos by text
document.querySelector('#search-todo').addEventListener('input', function(e){
    filters.searchText = e.target.value

    renderTodos(todos, filters)
})

// Add a new todo
document.querySelector('#todo-form').addEventListener('submit', function(e){
    e.preventDefault()
    
    todoText = e.target.elements.addTodo.value
    todos.push({text: todoText, completed: false})

    localStorage.setItem('todos', JSON.stringify(todos))

    renderTodos(todos, filters)

    e.target.elements.addTodo.value = ''
})

// Hide the completed todos
document.querySelector('#hide-completed').addEventListener('change', function(e){
    filters.hideCompleted = e.target.checked

    renderTodos(todos, filters)
})