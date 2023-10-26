let worksItems = [];

function getWorks() {
    fetch('http://localhost:5678/api/works', {method: "GET", headers: {"Content-Type": "application/json"}})
    .then(response => response.json())
    .then(json => {
        worksItems = json; 
        generateWorks(worksItems);
        filter(worksItems);
    })
    .catch(error => console.error(error))
}

function generateWorks(works) {
    const sectionGallery = document.querySelector(".gallery");

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

function btnColor(_n) {
    let btnAll = document.getElementById("btnAll");
    let btnObjects = document.getElementById("btnObjects");
    let btnAppartment = document.getElementById("btnAppartment");
    let btnHotel = document.getElementById("btnHotel");

    btnAll.classList.remove("filter-btn-active");
    btnObjects.classList.remove("filter-btn-active");
    btnAppartment.classList.remove("filter-btn-active");
    btnHotel.classList.remove("filter-btn-active");
    
    _n.classList.add("filter-btn-active");

}


// function btnColor(_n) {
//     let btn = document.querySelector(".filter-btn")
//     btn.classList.remove("filter-btn-active");
//     _n.classList.add("filter-btn-active");
// }

function filterWorks(filterId) {
    const filteredWorks = worksItems.filter(work => work.categoryId === filterId);
    generateWorks(filteredWorks);
}

function filter(works) {
    let btnAll = document.getElementById("btnAll");
    let btnObjects = document.getElementById("btnObjects");
    let btnAppartment = document.getElementById("btnAppartment");
    let btnHotel = document.getElementById("btnHotel");

    btnAll.addEventListener("click", function () {
        generateWorks(works); 
        btnColor(btnAll);
    });

    btnObjects.addEventListener("click", function () {
        filterWorks(1); 
        btnColor(btnObjects);
    });

    btnAppartment.addEventListener("click", function () {
        filterWorks(2);
        btnColor(btnAppartment);
    });

    btnHotel.addEventListener("click", function () {
        filterWorks(3);
        btnColor(btnHotel);
    });
}

getWorks();
