let todos = getSavedTodos()

const filters = {
    searchText: '',
    hideCompleted: false
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

    todoText = e.target.elements.addTodo.value.trim()
    if(todoText.length > 0){
        todos.push(
            {
            id: uuidv4(),
            text: todoText, 
            completed: false
        })
    
        saveTodos(todos)
    
        renderTodos(todos, filters)
    
        e.target.elements.addTodo.value = ''
    }
})

// Hide the completed todos
document.querySelector('#hide-completed').addEventListener('change', function(e){
    filters.hideCompleted = e.target.checked

    renderTodos(todos, filters)
})