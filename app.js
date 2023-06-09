window.addEventListener('DOMContentLoaded', () => {
    const search = document.querySelector("#search");
    const searchButton = document.querySelector("#searchButton");
    const tableContainer = document.querySelector("#results tbody");
    const resultsContainer = document.querySelector("#resultsContainer");
    const errorsContainer = document.querySelector(".errors-container");
    const previousButton = document.querySelector("#previousButton");
    const nextButton = document.querySelector("#nextButton");

    let currentPage = 1;
    const resultsPerPage = 10;
    let totalResults = 0;
    let search_criteria = "";

    if (search) {
        search.addEventListener('input', event => {
            search_criteria = event.target.value;
            currentPage = 1;
            showResults();
        });
    } else {
        resultsContainer.style.display = 'none';
    }
    

    previousButton.addEventListener("click", () => {
        if (currentPage > 1) {
          currentPage--;
          showResults();
        }
      });
    
    nextButton.addEventListener("click", () => {
        if (currentPage > 0) {
            currentPage++;
            console.log(currentPage);
            showResults();
        }
    });

    // Enviar petición usando fetch
    const searchData = async () => {
        let formData = new FormData();
        formData.append("search_criteria", search_criteria);
        formData.append("start_index", (currentPage - 1) * resultsPerPage);
        formData.append("end_index", resultsPerPage);

        try {
            const response = await fetch("./php/search_data1.php", {
                method: "POST",
                body: formData,
            });

            return response.json();
        } catch (error) {
            alert(
                `Hubo un error y no podemos procesar la solicitud en este momento. Razones: ${error.message}`
            );
            console.log(error);
        }
    };

    // Función para mostrar los datos
    const showResults = () => {
        searchData()
            .then(dataResults => {
                console.log(dataResults);
                tableContainer.innerHTML = '';
                if (typeof dataResults.data !== 'undefined' && !dataResults.data) {
                    errorsContainer.style.display = 'block';
                    errorsContainer.querySelector('p').innerHTML = `
                    No hay resultados para el criterio de búsqueda: <span class="bold">${search_criteria}</span>`;
                    resultsContainer.style.display = 'none';
                } else {
                    resultsContainer.style.display = 'block';
                    errorsContainer.style.display = 'none';
                    for (const author of dataResults) {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                        <td>${author.id}</td>
                        <td>${author.nombre}</td>
                        `;
                        tableContainer.appendChild(row);
                    }

                    totalResults = dataResults.total;
                    updatePaginationButtons();
                }
            });
    };

    const updatePaginationButtons = () => {
        previousButton.disabled = currentPage === 1;
        nextButton.disabled =
          currentPage === Math.ceil(totalResults / resultsPerPage);
    };

});
