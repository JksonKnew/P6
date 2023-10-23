let worksItems = [];

function getWorks() {
    fetch('http://localhost:5678/api/works', {method: "GET", headers: {"Content-Type": "application/json"}})
    .then(response => response.json())
    .then(json => {
        worksItems = json; // Assign the JSON data to the global worksItems variable
        generateWorks(worksItems);
        filter(worksItems);
    })
    .catch(error => console.error(error))
}

function generateWorks(works) {
    const sectionGallery = document.querySelector(".gallery");

    // Clear the existing content
    sectionGallery.innerHTML = '';

    for (let i = 0; i < works.length; i++) {
        const singleWork = works[i];
        const figure = document.createElement("figure");
        const imageFigure = document.createElement("img");
        imageFigure.src = singleWork.imageUrl;
        imageFigure.alt = singleWork.title;
        const caption = document.createElement("figcaption");
        caption.innerText = singleWork.title;

        sectionGallery.appendChild(figure);
        figure.appendChild(imageFigure);
        figure.appendChild(caption);
    }
}

function filterWorks(categoryId) {
    const filteredWorks = worksItems.filter(work => work.categoryId === categoryId);
    generateWorks(filteredWorks);
}

function filter(works) {
    let btnAll = document.getElementById("btnAll");
    let btnObjects = document.getElementById("btnObjects");
    let btnAppartment = document.getElementById("btnAppartment");
    let btnHotel = document.getElementById("btnHotel");

    btnAll.addEventListener("click", function () {
        generateWorks(works); // Display all works
    });

    btnObjects.addEventListener("click", function () {
        filterWorks(1); // Display works with categoryId 1 (Objects)
    });

    btnAppartment.addEventListener("click", function () {
        filterWorks(2); // Display works with categoryId 2 (Appartements)
    });

    btnHotel.addEventListener("click", function () {
        filterWorks(3); // Display works with categoryId 3 (Hotels & restaurants)
    });
}

getWorks();
