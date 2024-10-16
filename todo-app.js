const todos = [{
    text: 'Buy cat food',
    completed: false
}, {
    text: 'Clean the kitchen',
    completed: true
}, {
    text: 'Buy food',
    completed: false
}, {
    text: 'Exercise',
    completed: false
}, {
    text: 'JS course',
    completed: false
}]

const filters = {
    searchText: ''
}

const renderTodos = function(todos, filters){
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
    
    filteredTodos.forEach(function(todo){
        
        const todoEl = document.createElement('p')
        todoEl.textContent = todo.text
    
        document.querySelector('#todos').appendChild(todoEl)
        
    })
}

renderTodos(todos, filters)

document.querySelector('#search-todo').addEventListener('input', function(e){
    filters.searchText = e.target.value

    renderTodos(todos, filters)
})

// Add todo
document.querySelector('#todo-form').addEventListener('submit', function(e){
    e.preventDefault()
    
    todoText = e.target.elements.addTodo.value
    todos.push({text: todoText, completed: false})

    renderTodos(todos, filters)

    e.target.elements.addTodo.value = ''
})