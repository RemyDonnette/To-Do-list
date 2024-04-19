export function createLine(e) {
    
    const liste = document.querySelector('.list-group')
    const ligne = document.createElement('li')
    const label1 = document.createElement('label')
    const checkbox = document.createElement('input')
    const label2 = document.createElement('label')
    const icon = document.createElement('i')

    ligne.className = 'todo list-group-item d-flex align-items-center'
    
    checkbox.className = 'form-check-input'
    checkbox.type = 'checkbox'

    label1.innerText = e
    label1.className = 'ms-2 form-check-label'

    label2.className = 'ms-auto btn btn-danger btn-sm'
    icon.className = 'bi-trash'

    liste.append(ligne)
    ligne.append(checkbox, label1, label2)
    label2.append(icon)

    const boutonAll = document.querySelector('#all')
    const boutonTodo = document.querySelector('#todo')
    const boutonDone = document.querySelector('#done')

    boutonAll.addEventListener('click', () => {
        
        boutonAll.className = ('btn btn-outline-primary active')
        boutonTodo.className = ('btn btn-outline-primary')
        boutonDone.className = ('btn btn-outline-primary')

        ligne.style.setProperty('display', 'flex', 'important')     
    })

    boutonTodo.addEventListener('click', () => {

        boutonTodo.className = ('btn btn-outline-primary active')
        boutonAll.className = ('btn btn-outline-primary')
        boutonDone.className = ('btn btn-outline-primary')

        if (checkbox.checked) {
            ligne.style.setProperty('display', 'none', 'important')  
        } else if (checkbox.checked === false) {
            ligne.style.setProperty('display', 'flex', 'important')  
        }
    })

    boutonDone.addEventListener('click', () => {

        boutonDone.className = ('btn btn-outline-primary active')
        boutonAll.className = ('btn btn-outline-primary')
        boutonTodo.className = ('btn btn-outline-primary')

        if (checkbox.checked) {
            ligne.style.setProperty('display', 'flex', 'important')         
        } else if (checkbox.checked === false) {
            ligne.style.setProperty('display', 'none', 'important')  
        } 
    })

    checkbox.addEventListener('click', () => {

        if (boutonAll.classList == 'btn btn-outline-primary active') {
            ligne.style.setProperty('display', 'flex', 'important')
        } else if (boutonTodo.classList == 'btn btn-outline-primary active') {
            if (checkbox.checked) {
                ligne.style.setProperty('display', 'none', 'important')
            } else if (checkbox.checked === false){
                ligne.style.setProperty('display', 'flex', 'important')
            }
        } else if (boutonDone.classList == 'btn btn-outline-primary active') {
            if (checkbox.checked) {
                ligne.style.setProperty('display', 'flex', 'important')
            } else if (checkbox.checked === false){
                ligne.style.setProperty('display', 'none', 'important')
            }
        }
    })

    label2.addEventListener('click', () => {
        ligne.remove()
    })
}
