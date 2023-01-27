// Afficher les projets
function project(){
    fetch("http://localhost:5678/api/works")
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
    const newFig = document.createElement("figure");

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