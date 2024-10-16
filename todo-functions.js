// Fetch existing todos from localStorage
const getSavedTodos = function(){
    const todosJSON = localStorage.getItem('todos')

    if(todosJSON !== null){
        return JSON.parse(todosJSON)
    }
    else{
        return []
    }
}

// Save todos to localStorage
const saveTodos = function(todos){
    localStorage.setItem('todos', JSON.stringify(todos))
}

// Render application todos based on filters
const renderTodos = function(todos, filters, hideCompleted){
    const filteredTodos = todos.filter(function(todo){
        return todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    const incompleteTodos = filteredTodos.filter(function(todo){
        return !todo.completed
    })

    document.querySelector('#todos').innerHTML = ''
    
    generateSummary(incompleteTodos)

    if(filters.hideCompleted){
        incompleteTodos.forEach(function(todo){
        
            generateTodoDOM(todo)
        })
    }else {

        filteredTodos.forEach(function(todo){
        
            generateTodoDOM(todo) 
        })
    }
}

// Generate dom structure for todo
const generateTodoDOM = function(todo){

    const todoEl = document.createElement('p')
    todoEl.textContent = todo.text
        
    document.querySelector('#todos').appendChild(todoEl)
}

// Generate the dom for summary
const generateSummary = function(todos){
    const summary = document.createElement('h2')
    summary.textContent = `You have ${todos.length} todos left`
    
    document.querySelector('#todos').appendChild(summary)
}