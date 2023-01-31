// Créer les filtres
function createFilters() {
    fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    .then((categories) => {
        const filters = document.createElement("div");
        filters.id = "filters";
        filters.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            width: 54%;
            margin-bottom: 50px;
        `;
        
        const gallery = document.getElementsByClassName("gallery");
        const portfolio = document.getElementById("portfolio");
        portfolio.appendChild(filters);
        portfolio.insertBefore(filters, gallery[0]);

        const filtersButton = document.createElement("button");
        filtersButton.style.cssText = `
            font-family : 'Syne';
            font-size : 16px;
            color : #1D6154;
            border : 1px solid #1D6154;
            border-radius : 60px;
            padding : 10px;
            min-width : 100px;
            text-align : center;
            background-color : white;
            cursor : pointer;
            margin : 5px;
        `;
        filtersButton.addEventListener("mouseenter", () => {
            filtersButton.style.cssText = `
                font-family : 'Syne';
                font-size : 16px;
                color : white;
                border : 1px solid #1D6154;
                border-radius : 60px;
                padding : 10px;
                min-width : 100px;
                text-align : center;
                background-color : #1D6154;
                cursor : pointer;
                margin : 5px;
            `;
        });
        filtersButton.addEventListener("mouseleave", () => {
            filtersButton.style.cssText = `
                font-family : 'Syne';
                font-size : 16px;
                color : #1D6154;
                border : 1px solid #1D6154;
                border-radius : 60px;
                padding : 10px;
                min-width : 100px;
                text-align : center;
                background-color : white;
                cursor : pointer;
                margin : 5px;
            `;
        });
        filtersButton.classList.add("filter");
        filtersButton.textContent = "Tous";
        filters.appendChild(filtersButton);

        for (let category of categories) {
            const filtersButtonCat = document.createElement("button");
            filtersButtonCat.style.cssText = `
                font-family : 'Syne';
                font-size : 16px;
                color : #1D6154;
                border : 1px solid #1D6154;
                border-radius : 60px;
                padding : 10px;
                min-width : 100px;
                text-align : center;
                background-color : white;
                cursor : pointer;
                margin : 5px;
            `;
            filtersButtonCat.addEventListener("mouseenter", () => {
                filtersButtonCat.style.cssText = `
                    font-family : 'Syne';
                    font-size : 16px;
                    color : white;
                    border : 1px solid #1D6154;
                    border-radius : 60px;
                    padding : 10px;
                    min-width : 100px;
                    text-align : center;
                    background-color : #1D6154;
                    cursor : pointer;
                    margin : 5px;
                `;
            });
            filtersButtonCat.addEventListener("mouseleave", () => {
                filtersButtonCat.style.cssText = `
                    font-family : 'Syne';
                    font-size : 16px;
                    color : #1D6154;
                    border : 1px solid #1D6154;
                    border-radius : 60px;
                    padding : 10px;
                    min-width : 100px;
                    text-align : center;
                    background-color : white;
                    cursor : pointer;
                    margin : 5px;
                `;
            });
            filtersButtonCat.classList.add("filter");
            filtersButtonCat.textContent = category.name;
            filters.appendChild(filtersButtonCat);
        }
    })
    .catch((error) => {
        console.log(error)
    });
};
createFilters();

// Utiliser les filtres
fetch("http://localhost:5678/api/works")
.then((response) => response.json())
.then((works) => {
    const button = document.querySelectorAll("#filters .filter");
    const gallery = document.getElementsByClassName("gallery");

    for (let i = 0; i < button.length; i++) {
        button[i].addEventListener("click", function () {
            while (gallery[0].firstChild) {
                gallery[0].removeChild(gallery[0].firstChild);
            }
            for (work of works) {
                if ( 
                    work.category.name === button[i].textContent || button[i].textContent === "Tous"
                ) {
                newWork(work);
                }
            }
        });
    }
})
.catch((error) => {
    console.log(error)
});