window.addEventListener('DOMContentLoaded', () => {
    const search = document.querySelector('#search')
    const tableContainer = document.querySelector('#results tbody')
    const resultsContainer = document.querySelector('#resultsContainer')
    const errorsContainer = document.querySelector('.errors-container')
    let search_criteria = ''

    if(search){
        search.addEventListener('input', event => {
            search_criteria = event.target.value.toUpperCase()
            showResults()
        })
    }

    // Enviar peticion usando fech
    const searchData = async () => {
        let searchData = new FormData()
        searchData.append('search_criteria', search_criteria)

        try {
            const response = await fetch('./php/search_data.php', {
                method: 'POST',
                body: searchData 
            })

            return response.json()
        } catch (error) {
            alert(`${'Hubo un error y no podemos procesar la solicitud en este momento. Razones: '}${error.message}`)
            console.log(error)
        }
    }

    // Funcion para mostrar los datos
    const showResults = () => {
        searchData()
        .then(dataResults => {
            console.log(dataResults)
            tableContainer.innerHTML = ''
            if(typeof dataResults.data !== 'undefined' && !dataResults.data){
                errorsContainer.style.display = 'block'
                errorsContainer.querySelector('p').innerHTML = `
                No hay resultados para el criterio de busqueda: <span class="bold">${search_criteria}</span>`
                resultsContainer.style.display = 'none'
            } else {
                resultsContainer.style.display = 'block'
                errorsContainer.style.display = 'none'
                for (const author of dataResults) {
                    const row = document.createElement('tr')
                    row.innerHTML = `
                    <td>${author.id}</td>
                    <td>${author.nombre}</td>
                    `
                    tableContainer.appendChild(row)
                }
            }
        })
    }
})