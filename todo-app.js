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

const filters ={
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

renderTodos(todos, {searchText: ''})

document.querySelector('#add-todo').addEventListener('input', function(e){
    // const todoEl = document.createElement('p')
    // todoEl.textContent = e.target.value

    // document.querySelector('#todos').appendChild(todoEl)
})

document.querySelector('#search-todo').addEventListener('input', function(e){
    filters.searchText = e.target.value

    renderTodos(todos, filters)
})