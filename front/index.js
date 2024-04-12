fetch('http://localhost:3000/task', {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json' 
    },
    body: JSON.stringify()
    // retourne la promesse
}).then((response) => {
    return response.json();
    //retourne les données de la promesse
}).then ((data) => {
    const form = document.querySelector('#form')
    form.addEventListener('submit', (e) => {
        e.preventDefault()

        const saisie = e.target[0].value
        const liste = document.querySelector('.list-group')
        const ligne = document.createElement('li')
        const label1 = document.createElement('label')
        const input = document.createElement('input')
        const label2 = document.createElement('label')
        const icon = document.createElement('i')

        ligne.className = 'todo list-group-item d-flex align-items-center'
        
        input.className = 'form-check-input'
        input.type = 'checkbox'
        input.id = 'todo-1'

        label1.innerText = saisie
        label1.className = 'ms-2 form-check-label'

        label2.className = 'ms-auto btn btn-danger btn-sm'
        icon.className = 'bi-trash'

        liste.append(ligne)
        ligne.append(input, label1, label2)
        label2.append(icon)

        icon.addEventListener('click', (e) => {
            ligne.remove()
        })
    
    const boutonToutes = document.querySelector('btn btn-outline-primary active')
    const boutonAFaire = document.querySelector('btn btn-outline-primary')
    const boutonFaites = document.querySelector('btn btn-outline-primary')

    })
    console.log(data[0].element);
})