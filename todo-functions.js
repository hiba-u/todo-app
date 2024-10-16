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

// Remove a todo
const removeTodo = function(id){

    const index = todos.findIndex(function(todo){
        return todo.id === id
    })

    if(index > -1){
        todos.splice(index, 1)
    }
}

// Toggle a todo
const toggleTodo = function(id, isChecked){
    const updateTodo = todos.find(function(todo){
        return todo.id === id
    })

    if(updateTodo !== undefined){
        updateTodo.completed = isChecked
    }
}

// Generate dom structure for todo
const generateTodoDOM = function(todo){

    const todoEl = document.createElement('div')
    const textEl = document.createElement('span')
    const chkEl = document.createElement('input')
    const btnEl = document.createElement('button')

    // Checkbox
    chkEl.setAttribute('type', 'checkbox')
    chkEl.checked = todo.completed
    todoEl.appendChild(chkEl)
    chkEl.addEventListener('change', function(e){
        toggleTodo(todo.id, e.target.checked)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    // Todo text
    textEl.textContent = todo.text
    todoEl.appendChild(textEl)

    // Remove todo button
    btnEl.textContent = 'X'
    todoEl.appendChild(btnEl)
    btnEl.addEventListener('click', function(){
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })
        
    document.querySelector('#todos').appendChild(todoEl)
}

// Generate the dom for summary
const generateSummary = function(todos){
    const summary = document.createElement('h2')
    summary.textContent = `You have ${todos.length} todos left`
    
    document.querySelector('#todos').appendChild(summary)
}