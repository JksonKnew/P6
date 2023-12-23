let worksItems = [];

function getWorks() {
    fetch('http://localhost:5678/api/works', {method: "GET", headers: {"Content-Type": "application/json"}})
    .then(response => response.json())
    .then(json => {
        worksItems = json;
        generateWorks(worksItems);
        adminGallery(worksItems);
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
    if (filterId === 0) {
        generateWorks(worksItems);
        resetFilter();
        document.getElementById(`btnFilter${filterId}`).classList.add("filter-btn-active");
        return
    }
    const filteredWorks = worksItems.filter(work => work.categoryId === filterId);
    generateWorks(filteredWorks);


    resetFilter();
    document.getElementById(`btnFilter${filterId}`).classList.add("filter-btn-active");
}

function resetFilter(){
    document.getElementById("btnFilter0").classList.remove("filter-btn-active");
    document.getElementById("btnFilter1").classList.remove("filter-btn-active");
    document.getElementById("btnFilter2").classList.remove("filter-btn-active");
    document.getElementById("btnFilter3").classList.remove("filter-btn-active");
}


getWorks();


// ********************************************  Loggin  ********************************************/

//***************************************** Login Verifiction *****************************************

let isConnect = false
function verifyLog() {
    if (window.sessionStorage.getItem("token") != null){
        createElementsAdmin();
        isConnect = true
    } else {
        let modaleSection = document.getElementById("modaleFullContainer")
        modaleSection.remove();
        isConnect = false
    }
}

document.addEventListener("DOMContentLoaded", function() {
    verifyLog();
});
function createElementsAdmin() {

    //********************** Editor mode header ************

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
    logoutBtn.setAttribute("onclick", "logout()");
    
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

function logout() {
    window.sessionStorage.removeItem("token")
    verifyLog();
    location.reload();
}

    //************************ Gallery Admin **********************
function adminGallery(works) {

    container = document.getElementById("galleryEditContainer");

    if (isConnect === true) {    
        
        for (i=0; i < works.length; i++) {
        const work = works[i]

        figure = document.createElement("figure");
        div = document.createElement("div");
        div.classList.add("trash-container");
        // div.setAttribute("onclick", `deleteImg(${work.id})`)
        div.addEventListener('click', () => deleteImg(work.id))
        trash = document.createElement("i");
        trash.classList.add("fa-solid", "fa-trash-can", "fa-sm");
        image = document.createElement("img");
        image.src = work.imageUrl;

        container.appendChild(figure);
        figure.appendChild(div);
        div.appendChild(trash);
        figure.appendChild(image);

    }}

}

function deleteImg(i) {
    let index = i;
    let modale = document.querySelector(".delete-validation-container");
    modale.style.display = "flex";

    document.querySelector(".delete-annulation-btn").addEventListener("click",function(){
        modale.style.display = "none";
        index = '';
    })

    document.querySelector(".delete-validation-btn").addEventListener("click", function(){
        console.log(index);
        fetch(`http://localhost:5678/api/works/${i}`, {
            method: "DELETE", 
            headers: {Authorization: `Bearer ${window.sessionStorage.getItem("token")}`
        }});
        generateWorks(worksItems);
    })
}

function addImg(){
    const formData = new FormData();
    const imgFileInput = document.getElementById('imgFile');
    const titleInput = document.getElementById('title');
    const categorySelect = document.getElementById('category');
  
    formData.append('image', imgFileInput.files[0]);
    formData.append('title', titleInput.value);
    formData.append('category', categorySelect.value);

    fetch(`http://localhost:5678/api/works/`, {
        method: "POST", 
        headers: {Authorization: `Bearer ${window.sessionStorage.getItem("token")}`},
        body: formData,
    });
    generateWorks(worksItems);
}


//***************************************** Modale ***************************************

let isOpen = false;

function openModale() {
    let modaleActive = document.querySelector(".modale-full-container");
    modaleActive.style.display="flex";
    document.getElementById("return-modale-btn").style.display="none";
    setTimeout(()=>{
        isOpen=true
    },50);
    window.addEventListener('click', listenerClick);
}

function listenerClick(e) {
    const divModale = document.querySelector(".modale-container");
    if (!divModale.contains(e.target)){
        if (isOpen) {
            closeModale();
        }
    }
}

function closeModale() {
    returnModale();
    let modaleSection = document.querySelector(".modale-full-container");
    modaleSection.style.display="none";
    isOpen = false;
}

function modaleSecondPage() {
    document.querySelector(".btn-add-photo").style.display="none";
    document.getElementById("galleryEditContainer").style.display="none";
    document.querySelector(".submit-image-form").style.display="flex";
    document.querySelector(".btn-validation").style.display="flex";
    let leftBtn = document.getElementById("return-modale-btn");
    leftBtn.style.display="flex";
    let navigationDiv = document.querySelector(".nav-modale-btn");
    navigationDiv.style="justify-content: space-between";
    document.querySelector(".modale-title").innerHTML="Ajout Photo";

    document.getElementById("imgFile").addEventListener("change", handleImgFileChange);
}

function handleImgFileChange(event) {
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
}

function returnModale() {
    document.querySelector(".btn-add-photo").style.display="flex";
    document.getElementById("galleryEditContainer").style.display="flex";
    document.querySelector(".submit-image-form").style.display="none";
    document.querySelector(".btn-validation").style.display="none";
    document.querySelector(".nav-modale-btn").style="justify-content: flex-end";
    document.getElementById("return-modale-btn").style.display="none";
    document.querySelector(".modale-title").innerHTML="Galerie Photo";
    document.getElementById("imgFile").removeEventListener("change", handleImgFileChange);
}

//***************************** Listener Modale **************************************************

    // Listener nav button
document.addEventListener("DOMContentLoaded", function() {
    if (isConnect) {
        document.getElementById("return-modale-btn").addEventListener("click", function(){
            returnModale();
        });
    
        document.getElementById("close-modale-btn").addEventListener("click", function(){
            closeModale();
        });
    }
});


// listener add Img btn
document.addEventListener("DOMContentLoaded", function() {
    if (isConnect) {
        document.getElementById("btn-add-photo").addEventListener("click", function(){
            modaleSecondPage();
        });
    
        document.getElementById("btn-validation").addEventListener("click", function(){
            addImg();
        });
    }
});



//************************* Listener Filter button *******************************************

document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("btnFilter0").addEventListener("click", function() {
        filterWorks(0);
    });
    
    document.getElementById("btnFilter1").addEventListener("click", function() {
        filterWorks(1);
    });
    
    document.getElementById("btnFilter2").addEventListener("click", function() {
        filterWorks(2);
    });
    
    document.getElementById("btnFilter3").addEventListener("click", function() {
        filterWorks(3);
    });
    
});
