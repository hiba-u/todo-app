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

const incompleteTodos = todos.filter(function(todo){
    return !todo.completed
})

const summary = document.createElement('h2')
summary.textContent = `You have ${incompleteTodos.length} todos left`

document.querySelector('body').appendChild(summary)

todos.forEach(function(todo){
    
    const p = document.createElement('p')
    p.textContent = todo.text

    document.body.appendChild(p)
    
})