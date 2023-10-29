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


    //************************ filter & Modify button **********************

    let filterContainer = document.querySelector(".portfolio-title-container");
    let btnDivModify = document.createElement("div");
    btnDivModify.classList.add("modify-btn");
    btnDivModify.setAttribute("id", "modifyBtn");
    btnDivModify.setAttribute("onclick", "modaleFirstPage()");
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
}

function closeModale() {
    let modaleSection = document.querySelector(".modale-full-container");
    let modaleContent = document.querySelector(".modale-container");


    modaleSection.style.display="none";
    modaleContent.remove();
}

function modaleFirstPage() {
    fetch('http://localhost:5678/api/works', {method: "GET", headers: {"Content-Type": "application/json"}})
    .then(response => response.json())
    .then(json => {
        worksItems = json;
        firstModaleGeneration(worksItems)
    })
    .catch(error => console.error(error))
}

function switchSecondToFirst() {
    closeModale();
    modaleFirstPage();
}

function firstModaleGeneration(works) {

    openModale();

    // Modale container
    let modaleSection = document.getElementById("modaleFullContainer");
    let mainContainer = document.createElement("div");
    mainContainer.classList.add("modale-container");
    modaleSection.appendChild(mainContainer);


    // Nav bouton
    let nav = document.createElement("div");
    nav.classList.add("nav-modale-btn");
    mainContainer.appendChild(nav);

    let crossBtn = document.createElement("i");
    crossBtn.classList.add("fa-solid", "fa-xmark", "fa-xl", "close-modale-btn");
    crossBtn.setAttribute("onclick", "closeModale()");
    nav.appendChild(crossBtn);


    // Title 
    let modaleTitle = document.createElement("span");
    modaleTitle.classList.add("modale-title");
    modaleTitle.innerHTML="Galerie Photo";
    mainContainer.appendChild(modaleTitle);


    // Gallery Container
    let container = document.createElement("div");
    container.classList.add("gallery-editor-container");
    container.setAttribute("id", "galleryEditContainer");
    mainContainer.appendChild(container);


    // Btn
    let addPhotoBtn = document.createElement("span");
    addPhotoBtn.classList.add("btn-add-photo");
    addPhotoBtn.setAttribute("onclick", "modaleSecondPage()");
    addPhotoBtn.innerHTML="Ajouter une photo";
    mainContainer.appendChild(addPhotoBtn);

    for (i=0; i < works.length; i++) {
        const work = works[i]

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

function modaleSecondPage() {

    closeModale();
    openModale();

    // Modale container
    let modaleSection = document.getElementById("modaleFullContainer");
    let mainContainer = document.createElement("div");
    mainContainer.classList.add("modale-container");
    modaleSection.appendChild(mainContainer);


    // Nav bouton
    let nav = document.createElement("div");
    nav.classList.add("nav-modale-btn");
    mainContainer.appendChild(nav);

    let crossBtn = document.createElement("i");
    crossBtn.classList.add("fa-solid", "fa-xmark", "fa-xl", "close-modale-btn");
    crossBtn.setAttribute("onclick", "closeModale()");
    nav.appendChild(crossBtn);

    let leftBtn = document.createElement("i");
    leftBtn.classList.add("fa-solid", "fa-arrow-left", "fa-xl", "left-modale-btn");
    leftBtn.setAttribute("onclick", "closeModale()");
    leftBtn.setAttribute("onclick", "switchSecondToFirst()")
    nav.prepend(leftBtn);
    nav.style="justify-content: space-between";

    // Title 
    let modaleTitle = document.createElement("span");
    modaleTitle.classList.add("modale-title");
    modaleTitle.innerHTML="Galerie Photo";
    mainContainer.appendChild(modaleTitle);


    // Form Container
    let container = document.createElement("div");
    container.classList.add("form-modale-container");
    mainContainer.appendChild(container);

    // Form
    let submitImageForm = document.createElement("form");
    submitImageForm.classList.add("submit-image-form");
    container.appendChild(submitImageForm);

    let imgFileLabel = document.createElement("label");
    imgFileLabel.classList.add("label-file");
    imgFileLabel.setAttribute("for", "imgFile");
    submitImageForm.appendChild(imgFileLabel);
    let imgFileLabelFa = document.createElement("i");
    imgFileLabelFa.classList.add("far", "fa-image", "fa-2x");
    imgFileLabel.appendChild(imgFileLabelFa);
    let imgFileLabelBtn = document.createElement("span");
    imgFileLabelBtn.classList.add("add-img-from-btn");
    imgFileLabelBtn.innerHTML="+ Ajouter une photo";
    imgFileLabel.appendChild(imgFileLabelBtn);
    let inputImg = document.createElement("input");
    inputImg.classList.add("img-file-input");
    inputImg.setAttribute("type", "file");
    inputImg.setAttribute("id", "imgFile");
    inputImg.setAttribute("accept", "image/png, image/jpeg");
    submitImageForm.appendChild(inputImg);

    let titleLabel = document.createElement("label");
    titleLabel.classList.add("input-title");
    titleLabel.setAttribute("for", "title");
    titleLabel.innerHTML="Titre";
    submitImageForm.appendChild(titleLabel);
    let titleInput = document.createElement("input");
    titleInput.setAttribute("type", "text");
    titleInput.setAttribute("id", "title");
    submitImageForm.appendChild(titleInput);

    let categoryTitle = document.createElement("label");
    categoryTitle.classList.add("input-title");
    categoryTitle.setAttribute("for", "category");
    categoryTitle.innerHTML="Catégorie";
    submitImageForm.appendChild(categoryTitle);
    let categoryInput = document.createElement("select");
    categoryInput.classList.add("category-select");
    categoryInput.setAttribute("id", "category");
    submitImageForm.appendChild(categoryInput);
    let optionNull = document.createElement("option");
    categoryInput.appendChild(optionNull);
    let optionObject = document.createElement("option");
    optionObject.setAttribute("value", "1");
    optionObject.innerHTML="Objets";
    categoryInput.appendChild(optionObject);
    let optionAppartements = document.createElement("option");
    optionAppartements.setAttribute("value", "2");
    optionAppartements.innerHTML="Appartements";
    categoryInput.appendChild(optionAppartements);
    let optionHotel = document.createElement("option");
    optionHotel.setAttribute("value", "3");
    optionHotel.innerHTML="Hôtels et Restaurants";
    categoryInput.appendChild(optionHotel);

    // Btn validation
    let addPhotoBtn = document.createElement("span");
    addPhotoBtn.classList.add("btn-validation");
    addPhotoBtn.innerHTML="Valider";
    mainContainer.appendChild(addPhotoBtn);

}





