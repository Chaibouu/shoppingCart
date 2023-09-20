let containercarte = document.querySelector('.containercarte');
let btnAll = document.querySelector('.btnAll');
let btnArbre = document.querySelector('.btnArbre');
let btnPalmier = document.querySelector('.btnPalmier');
let btnConifere = document.querySelector('.btnConifere');
let btnHerbace = document.querySelector('.btnHerbace');
let btnMousse = document.querySelector('.btnMousse');
let inputsearch = document.querySelector('.inputsearch');
let btnSearch = document.querySelector('.btnSearch');



//la fonction affichage des données des produits depuis de datas
const afficheProduit = (datas)=>{
    datas.forEach(element => {
        containercarte.innerHTML +=`<div class="card col-9 col-md-5 col-lg-3 d-flex justify-content-center align-item-center p-0 m-4">
        <div class="carteimg w-100 "> 
            <img src=${element.url} class="card-img-top" alt="...">
        </div>
        <div class="card-body  piedCarte">
          <div class="text-end">
            <i class="fa-regular fa-star btnEtoile"></i>
            <i class="fa-regular fa-star btnEtoile"></i>
            <i class="fa-regular fa-star btnEtoile"></i>
            <i class="fa-regular fa-star btnEtoile"></i>
            <i class="fa-regular fa-star btnEtoile"></i>
          </div>
          <div class="d-flex justify-content-between">
            <h5 class="card-title">${element.libelle}</h5>
            <h5>${element.prix} F</h5>
          </div>
        </div>
      </div>`
    });
}
afficheProduit(datas)


// les boutton filtrer===========================================================

btnAll.addEventListener('click', () => {
    containercarte.innerHTML ="";
    afficheProduit(datas);
});
btnArbre.addEventListener('click', () => {
    const arbustes = datas.filter((element) => element.libelle == 'Arbuste');
    containercarte.innerHTML ="";
    afficheProduit(arbustes);
});

btnPalmier.addEventListener('click',()=>{
    const Palmier = datas.filter((element) => element.libelle == 'Palmier');
    containercarte.innerHTML ="";
    afficheProduit(Palmier);
})
btnConifere.addEventListener('click',()=>{
    const Conifère = datas.filter((element) => element.libelle == 'Conifère');
    containercarte.innerHTML ="";
    afficheProduit(Conifère);
})
btnHerbace.addEventListener('click',()=>{
    const Herbacée = datas.filter((element) => element.libelle == 'Herbacée');
    containercarte.innerHTML ="";
    afficheProduit(Herbacée);
})
btnMousse.addEventListener('click',()=>{
    const Mousse = datas.filter((element) => element.libelle == 'Mousse');
    containercarte.innerHTML ="";
    afficheProduit(Mousse);
})

// le boutton Search===========================================================

btnSearch.addEventListener('click',()=>{
    if (inputsearch.value == 'All') {
        containercarte.innerHTML ="";
        afficheProduit(datas);
        inputsearch.value = ""
    }
    else{
        const fil = datas.filter((element) => element.libelle == inputsearch.value);
        containercarte.innerHTML ="";
        afficheProduit(fil);
        console.log(inputsearch.value);
        console.log(fil);
        inputsearch.value =""
    }

})






let btnEtoile = document.querySelectorAll('.btnEtoile')
// btnEtoile.forEach(element => {
//     element.addEventListener('click', ()=>{
//         element.classList.remove('fa-regular');
//         element.classList.remove('fa-star');
//         element.setAttribute('class','fa-solid fa-star')
//         element.classList.add('colorEtoile')
//     })
// });

let isStarred = true;
for (let i = 0; i < btnEtoile.length; i++) {
    btnEtoile[i].addEventListener('click', () => {
        if (!isStarred) {
            // Si le bouton est déjà en état "starred", inversez les modifications
            for (let j = 0; j <= i; j++) {
                btnEtoile[j].classList.remove('fa-regular');
                btnEtoile[j].classList.remove('fa-star');
                btnEtoile[j].setAttribute('class', 'fa-regular fa-star');
                btnEtoile[j].classList.remove('colorEtoilee');
            }
            
            isStarred = false; // Mettez à jour l'état du bouton
        } 
        else {
            // Si le bouton n'est pas en état "starred", appliquez les modifications
            for (let j = 0; j <= i; j++) {
                btnEtoile[j].classList.remove('fa-regular');
                btnEtoile[j].classList.remove('fa-star');
                btnEtoile[j].setAttribute('class', 'fa-solid fa-star');
                btnEtoile[j].classList.add('colorEtoile');
            }
            isStarred = true; // Mettez à jour l'état du bouton
        }
    })
    
}

