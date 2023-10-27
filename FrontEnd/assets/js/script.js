let worksItems = [];

function getWorks() {
    fetch('http://localhost:5678/api/works', {method: "GET", headers: {"Content-Type": "application/json"}})
    .then(response => response.json())
    .then(json => {
        worksItems = json;
        generateWorks(worksItems);
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

function filterWorks(filterId) {
    const filteredWorks = worksItems.filter(work => work.categoryId === filterId);
    generateWorks(filteredWorks);
}

function setBtnActive(_n) {
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


function btnColor(_n) {
    let btn = document.querySelector(".filter-btn")
    btn.classList.remove("filter-btn-active");
    _n.classList.add("filter-btn-active");
}



getWorks();


// ****************************  Loggin  **************************/
function createElementsAdmin() {

    //**********************Editor mode header************
    let body = document.getElementById("bodyContainer");
    let editorBanner = document.createElement("div");
    editorBanner.classList.add("editor-div");
    let editorBannerImg = document.createElement("i");
    editorBannerImg.classList.add("fa-regular", "fa-pen-to-square");
    let editorBannerTxt = document.createElement("p");
    editorBannerTxt.innerHTML = "Mode Édition";

    body.prepend(editorBanner);
    editorBanner.appendChild(editorBannerImg);
    editorBanner.appendChild(editorBannerTxt);

    //************************ Login/logout **********************

    document.getElementById("login-btn").style.display = "none";
    let navContainer = document.getElementById("nav-list");
    let logoutBtn = document.createElement("li");
    let logoutTxt = document.createElement("a");
    logoutTxt.innerHTML="Logout";
    logoutBtn.addEventListener("click", function(){
        window.localStorage.removeItem("token")
        verifyLog();
        location.reload();
    })
    
    navContainer.appendChild(logoutBtn);
    logoutBtn.appendChild(logoutTxt)


    //************************ filter **********************

    let filterContainer = document.querySelector(".portfolio-title-container");
    let btnDivModify = document.createElement("div");
    btnDivModify.classList.add("modify-btn");
    btnDivModify.setAttribute("id", "modifyBtn")
    let modifyBtnImg = document.createElement("i");
    modifyBtnImg.classList.add("fa-regular", "fa-pen-to-square");
    let modifyBtnTxt = document.createElement("p");
    modifyBtnTxt.innerHTML="Éditer";


    filterContainer.appendChild(btnDivModify);
    btnDivModify.appendChild(modifyBtnImg);
    btnDivModify.appendChild(modifyBtnTxt);


    document.querySelector(".filter-div").style.display = "none";

}

//************************ Login **********************

function verifyLog() {
    if (window.localStorage.getItem("token") != null){
        createElementsAdmin();

        
        let modifyBtn = document.getElementById("modifyBtn");
        let closeModaleBtn = document.getElementById("closeModaleBtn")
        modifyBtn.addEventListener("click", function(){
            openModale();
        })
        closeModaleBtn.addEventListener("click", function(){
            closeModale();
        })

    } else {
        let modaleSection = document.getElementById("modaleFullContainer")
        modaleSection.remove();
    }
}

document.addEventListener("DOMContentLoaded", function() {
    verifyLog();
});




//***************************************** Modale ***************************************

function openModale() {
    let modaleActive = document.querySelector(".modale-full-container");
    modaleActive.style.display="flex";
    fetchModale();
}

function closeModale() {
    let modaleActive = document.querySelector(".modale-full-container");
    let modaleContent = document.getElementById("galleryEditContainer")

    modaleActive.style.display="none";
    modaleContent.innerHTML='';
}

function fetchModale() {
    fetch('http://localhost:5678/api/works', {method: "GET", headers: {"Content-Type": "application/json"}})
    .then(response => response.json())
    .then(json => {
        worksItems = json;
        generateModaleImg(worksItems)
    })
    .catch(error => console.error(error))
}

function generateModaleImg(works) {
    let container = document.getElementById("galleryEditContainer");

    for (i=0; i < works.length; i++) {
        const work = works[i]
        console.log(work);

        figure = document.createElement("figure");
        div = document.createElement("div");
        div.classList.add("trash-container");
        trash = document.createElement("i");
        trash.classList.add("fa-solid", "fa-trash-can", "fa-sm");
        image = document.createElement("img");
        image.src = work.imageUrl;



        container.appendChild(figure);
        figure.appendChild(div);
        div.appendChild(trash);
        figure.appendChild(image);

    }
}
