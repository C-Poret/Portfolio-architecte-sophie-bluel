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

        const gallery = document.getElementsByClassName("gallery");
        const portfolio = document.getElementById("portfolio");

        portfolio.appendChild(filters);
        portfolio.insertBefore(filters, gallery[0]);

        const filtersButton = document.createElement("div");
        filtersButton.classList.add("filter");
        filtersButton.textContent = "Tous";
        filters.appendChild(filtersButton);

        for (let category of categories) {
            const filtersButtonCat = document.createElement("div");
            filtersButtonCat.classList.add("filter");
            filtersButtonCat.textContent = category.name;
            filters.appendChild(filtersButtonCat);
        }
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
});

// Style des filtres




