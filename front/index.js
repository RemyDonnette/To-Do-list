import { createLine } from './fonctions.js'

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

    const listeStockee = data
    let i = listeStockee.length

    for (i = 0; i < listeStockee.length; i++ ) {
        createLine(listeStockee[i].element)
    }
    
    const form = document.querySelector('#form')
    form.addEventListener('submit', (e) => {
        e.preventDefault()

        const saisie = e.target[0].value
        createLine(saisie)
    })
    
})
