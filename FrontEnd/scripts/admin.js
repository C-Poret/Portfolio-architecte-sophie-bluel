const modal = document.querySelector("#modal");
const modalGallery = document.querySelector(".modalGalleryPic");
const openModal = document.querySelector(".openModal");
const modalContainer = document.querySelector(".modalContainer");
const modalButtonX = document.querySelector(".modalButtonX");
const modalButtonArrow = document.querySelector(".modalButtonArrow");
const logout = document.querySelector(".logout");
const modalButtonAdd = document.querySelector(".modalButtonAdd");
const modalPage = document.querySelector(".modalPage");
const modalPageAdd = document.querySelector(".modalPageAdd");
const valideButton = document.querySelector(".valideButton");
const modalForm = document.querySelector(".modalForm");
const gallery = document.querySelector(".gallery");

// Afficher les projets sur la modal
function modalProjects(work) {
  work.map((works) => {
    const modalFigure = document.createElement("figure");
    modalFigure.setAttribute("index", works.id);
    modalFigure.style.cssText = `
        margin: 1% 8px;
        position: relative;
        height: 150px;
        width: 21.8%;
    `

    const modalImg = document.createElement("img");
    modalImg.crossOrigin = "anonymous";
    modalImg.src = works.imageUrl;
    modalImg.style.cssText = `
        object-fit: cover;
        width: 100%;
        height: 90%;
    `

    const modalText = document.createElement("figcaption");
    modalText.textContent = "éditer";

    const modalButton = document.createElement("button");
    modalButton.classList.add("deleteButton");
    modalButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
    modalButton.style.cssText = `
        position: absolute;
        top: 4%;
        right: 5%;
        background: black;
        color: white;
        border-radius: 2px;
        padding:  5px 7px;
        border: none;
        cursor: pointer;
    `

    modalFigure.appendChild(modalImg);
    modalFigure.appendChild(modalText);
    modalFigure.appendChild(modalButton);
    modalGallery.appendChild(modalFigure);
  });
};

// Récupérer les projets depuis le serveur
function createProjects() {
    fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((data) => {
        modalProjects(data);
    })
    .catch((error) => {
        console.log(error)
    });
};
createProjects();

//  Récupération du token 
const token = sessionStorage.getItem("token");

// Se déconnecter et supprimer le token
logout.addEventListener("click", (event) => {
    event.preventDefault();
    sessionStorage.clear();
    document.location.href = "index.html";
});

// Fermer la modal avec la croix
modalButtonX.addEventListener("click", () => {
    modal.style.visibility = "hidden";
    modalContainer.classList.remove("overlay");
    modalPage.classList.remove("hide");
    modalPageAdd.classList.add("hide");
    modalButtonArrow.classList.add("hide");
    modalForm.reset();
    label.style.removeProperty("visibility");
    preview.classList.add("hide");
    preview.src = "#";
});

// Fermer la modal en cliquant sur la page
window.onclick = (event) => {
    if (event.target == modalContainer) {
        modal.style.visibility = "hidden";
        modalContainer.classList.remove("overlay");
        modalPage.classList.remove("hide");
        modalPageAdd.classList.add("hide");
        modalButtonArrow.classList.add("hide");
        modalForm.reset();
        label.style.removeProperty("visibility");
        preview.classList.add("hide");
        preview.src = "#";
    }
};

// Ouvrir la modal
openModal.addEventListener("click", () => {
    modal.style.removeProperty("visibility");
    modalContainer.classList.add("overlay");
});

// Passer de la 1ere à la 2eme page de la modal
modalButtonAdd.addEventListener("click", () => {
    modalPage.classList.add("hide");
    modalPageAdd.classList.remove("hide");
    modalButtonArrow.classList.remove("hide");
});

// Repasser sur la 1ere page de la modal
modalButtonArrow.addEventListener("click", () => {
    modalPage.classList.remove("hide");
    modalPageAdd.classList.add("hide");
    modalButtonArrow.classList.add("hide");
    modalForm.reset();
    label.style.removeProperty("visibility");
    preview.classList.add("hide");
    preview.src = "#";
});

// Supprimer un projet
modalGallery.addEventListener("click", (event) => {
    if(event.target.className === "deleteButton") {
        const indexProject = parseInt(event.target.parentElement.getAttribute("index"))
        const modalProject = event.target.parentElement;
        deleteProject(modalProject, indexProject)
    }
});

function deleteProject(modalDeleteProject, indexDeleteProject) {
    fetch(`http://localhost:5678/api/works/${indexDeleteProject}`, {
        method: "DELETE",
    headers: { Authorization: "Bearer " + token, },
    })
    .then(() => {
        const modalFig = document.querySelectorAll(".modalGalleryPic .figure");
        modalDeleteProject.remove();
        modalFig.forEach((element) => {
            if (parseInt(element.getAttribute("index")) === indexDeleteProject) {
                element.remove();
            }
        });
        gallery.innerHTML = "";
        project();
    })
    .catch((error) => {
        console.log(error)
    });
};

let validForm = false;

// Changer la couleur du bouton Valider lorque les 3 infos sont entrées
const inputs = document.querySelectorAll("#modalPicture, #modalTitle, #modalCategory")
inputs.forEach((input) => {
    input.addEventListener("input", () => {
        if (
            inputs[0].value.length > 0 &&
            inputs[1].value.length > 0 &&
            inputs[2].value.length > 0 
        ) {
            valideButton.style.backgroundColor = "#1D6154";
            valideButton.style.cursor = "pointer";
            validForm = true;
        } else {
        valideButton.style.backgroundColor = "#A7A7A7";
        validForm = false;
        }
    });
});

// Selectionner le input pour insérer la photo au click sur me bouton "+ Ajouter photo"
function modalPictureInput() {
    document.querySelector("#modalPicture").click();
};

// Ajouter un projet
function sendWork() {
    const modalPicture = document.querySelector("#modalPicture");
    const modalTitle = document.querySelector("#modalTitle");
    const modalCategory = document.querySelector("#modalCategory");
    const data = new FormData();
    data.append("image", modalPicture.files[0]);
    data.append("title", modalTitle.value);
    data.append("category", modalCategory.value);

    fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: { Authorization: "Bearer " + token, },
    body: data,
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(response.statusText);
        }
    })
    .then(() => {
        gallery.innerHTML = "";
        project();
        modalGallery.innerHTML = "";
        createProjects();
        modal.style.visibility = "hidden";
        modalContainer.classList.remove("overlay");
        modalPage.classList.remove("hide");
        modalPageAdd.classList.add("hide");
        modalButtonArrow.classList.add("hide");
        modalForm.reset();
        valideButton.style.backgroundColor = "#A7A7A7";
        label.style.removeProperty("visibility");
        preview.classList.add("hide");
        preview.src = "#";
    })
    .catch((error) => {
        console.log(error)
    });
};

// On envoie les infos à l'api
document.addEventListener("click", (event) => {
    if (event.target.matches(".valideButton")) {
        if (!validForm) {
            alert("Veuillez remplir tous les champs du formulaire");
        };
        sendWork();
        event.stopPropagation();
        event.preventDefault();
    }
});

// Ajouter la preview de la photo selectionnée dans la modal
const modalPicture = document.querySelector("#modalPicture");
const preview = document.querySelector("#preview");
const label = document.querySelector(".addPicture label");

modalPicture.addEventListener("change", previewImg);

function previewImg() {
    const file = this.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.addEventListener("load", (event) => {
        preview.src = event.target.result
    });
    label.style.visibility = "hidden";
    preview.classList.remove("hide"); 
};