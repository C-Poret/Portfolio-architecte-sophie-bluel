const serverUrl = "http://localhost:5678/api/"

// Ajouter les projets
function project(){
    fetch(serverUrl + "works")
    .then((response) => response.json())
    .then((works) => {
        for (work of works) {
            newWork(work);
        }
    })
    .catch((error) => {
        console.log(error)
    });
};
project();

// Créer un projet
function newWork(work) {
    const gallery = document.getElementsByClassName("gallery");
    let newFig = document.createElement("figure");

    gallery[0].appendChild(newFig);
    newFig.setAttribute("data-id", work.id);

    const img = document.createElement("img");
    img.crossOrigin = "anonymous";
    img.src = work.imageUrl;
    img.alt = work.title;

    const figCap = document.createElement("figcaption");
    figCap.textContent = work.title;

    newFig.appendChild(img);
    newFig.appendChild(figCap);
}

// Créer les filtres
function createFilters() {
    fetch(serverUrl + "categories")
    .then((response) => response.json())
    .then((categories) => {
        const filters = document.createElement("div");
        filters.id = "filters";
        filters.style.cssText = `
            display: flex;
            justify-content: space-between;
            width: 52%;
            margin: 0 24% 50px 24%;
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
        `;
        filtersButton.addEventListener("mouseenter", function() {
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
            `;
        })
        filtersButton.addEventListener("mouseleave", function() {
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
            `;
        })
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
            `;
            filtersButtonCat.addEventListener("mouseenter", function() {
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
                `;
            })
            filtersButtonCat.addEventListener("mouseleave", function() {
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
                `;
            })
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
fetch(serverUrl + "works")
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

    