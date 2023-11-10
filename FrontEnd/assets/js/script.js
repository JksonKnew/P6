let worksItems = [];

function getWorks() {
    fetch('http://localhost:5678/api/works', {method: "GET", headers: {"Content-Type": "application/json"}})
    .then(response => response.json())
    .then(json => {
        worksItems = json;
        generateWorks(worksItems);
        createAdminGallery(worksItems);
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


// ********************************************  Loggin  ********************************************/
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
    btnDivModify.setAttribute("onclick", "openModale()");
    let modifyBtnImg = document.createElement("i");
    modifyBtnImg.classList.add("fa-regular", "fa-pen-to-square");
    let modifyBtnTxt = document.createElement("p");
    modifyBtnTxt.innerHTML="Éditer";


    filterContainer.appendChild(btnDivModify);
    btnDivModify.appendChild(modifyBtnImg);
    btnDivModify.appendChild(modifyBtnTxt);


    document.querySelector(".filter-div").style.display = "none";

}
    //************************ Gallery Admin **********************
function createAdminGallery(works) {

    container = document.getElementById("galleryEditContainer");


    for (i=0; i < works.length; i++) {
        const work = works[i]

        figure = document.createElement("figure");
        div = document.createElement("div");
        div.classList.add("trash-container");
        div.setAttribute("onclick", `deleteFig(${work.id})`)
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

function deleteFig(i) {

    let index = i;

    let modale = document.querySelector(".delete-validation-container");
    modale.style.display = "flex";

    document.querySelector(".delete-annulation-btn").addEventListener("click",function(){
        modale.style.display = "none";
        index = '';
    })

    document.querySelector(".delete-validation-btn").addEventListener("click", function(){
        console.log(index);
        window.location.reload();
        fetch(`http://localhost:5678/api/works/${i}`, {
            method: "DELETE", 
            headers: {Authorization: `Bearer ${window.localStorage.getItem("token")}`
        }});
    })
}

function addFig(){
    const formData = new FormData();

    const imgFileInput = document.getElementById('imgFile');


    const titleInput = document.getElementById('title');
    const categorySelect = document.getElementById('category');
  

    formData.append('image', imgFileInput.files[0]);
    formData.append('title', titleInput.value);
    formData.append('category', categorySelect.value);

    console.log(imgFileInput.files[0]);
    console.log(titleInput.value);
    console.log(categorySelect.value);
    console.log(formData);

    fetch(`http://localhost:5678/api/works/`, {
        method: "POST", 
        headers: {Authorization: `Bearer ${window.localStorage.getItem("token")}`},
        body: formData,
    });
}



//***************************************** Login *****************************************

function verifyLog() {
    if (window.localStorage.getItem("token") != null){
        createElementsAdmin();

        
        let modifyBtn = document.getElementById("modifyBtn");
        modifyBtn.addEventListener("click", function(){
            openModale(); // Mettre cette fonction en onclick
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
    document.getElementById("returnModaleBtn").style.display="none";
}

function closeModale() {
    returnModale();
    let modaleSection = document.querySelector(".modale-full-container");
    modaleSection.style.display="none";
}

function modaleSecondPage() {
    document.querySelector(".btn-add-photo").style.display="none";
    document.getElementById("galleryEditContainer").style.display="none";
    document.querySelector(".submit-image-form").style.display="flex";
    document.querySelector(".btn-validation").style.display="flex";
    let leftBtn = document.getElementById("returnModaleBtn");
    leftBtn.style.display="flex";
    let navigationDiv = document.querySelector(".nav-modale-btn");
    navigationDiv.style="justify-content: space-between";
    document.querySelector(".modale-title").innerHTML="Ajout Photo";

    let imgFile = document.getElementById("imgFile");
    imgFile.addEventListener("change", function(){
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            let imgFile = document.createElement("img");
            imgFile.src = URL.createObjectURL(selectedFile);
            imgFile.style.height = "100%";
            imgFile.style.objectFit = "cover";

            let imgFileContainer = document.querySelector(".label-file");
            imgFileContainer.appendChild(imgFile);
            document.querySelector(".add-img-from-btn").style.display = "none";
            document.querySelector(".far").style.display = "none";


            console.log("Fichier chargé : " + selectedFile.name);
        }
        
    })


}

function returnModale() {
    document.querySelector(".btn-add-photo").style.display="flex";
    document.getElementById("galleryEditContainer").style.display="flex";
    document.querySelector(".submit-image-form").style.display="none";
    document.querySelector(".btn-validation").style.display="none";
    document.querySelector(".nav-modale-btn").style="justify-content: flex-end";
    document.getElementById("returnModaleBtn").style.display="none";
    document.querySelector(".modale-title").innerHTML="Galerie Photo";

}





// Setup click outside modale
// renaming
// login iferror
// gestion error

// Probleme dans le premier fetch, il execute la func admingallery alors que le parent n'exsite pas, faut trouver une solution pour extraire le tableau du fetch et exe la func dans le login verify
// Le fetch delete qui supprime pas les immages du dossier
// return error pour le Post


