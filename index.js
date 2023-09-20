let containercarte = document.querySelector('.containercarte');
let btnAll = document.querySelector('.btnAll');
let btnArbre = document.querySelector('.btnArbre');
let btnPalmier = document.querySelector('.btnPalmier');
let btnConifere = document.querySelector('.btnConifere');
let btnHerbace = document.querySelector('.btnHerbace');
let btnMousse = document.querySelector('.btnMousse');
let inputsearch = document.querySelector('.inputsearch');
let btnSearch = document.querySelector('.btnSearch');
let btnpanier = document.querySelector('.btnpanier');
let cardd = document.querySelector('.cardd');
let containerpanier = document.querySelector('.containerpanier');

// initialisation du tableau
const tab =[];
if(!localStorage.getItem('cles')){
    localStorage.setItem('cles',JSON.stringify(tab))
}


//la fonction affichage des données des produits depuis de datas
const afficheProduit = (datas)=>{
    datas.forEach(element => {
        containercarte.innerHTML +=`<div class="card col-9 col-md-5 col-lg-3 d-flex justify-content-center align-item-center p-0 m-4">
        <div class="carteimg w-100 "> 
            <img src=${element.url} class="card-img-top" alt="...">
        </div>
        <div class='container text-end fs-3 iconajoute'><i class="fa-solid fa-cart-arrow-down"></i></div>
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

    // button ajouter au panier
    let iconajoute = document.querySelectorAll('.iconajoute');
    for (let i = 0; i < iconajoute.length; i++) {
        iconajoute[i].style.cursor= 'pointer';
        iconajoute[i].addEventListener('click',()=>{
            iconajoute[i].style.background='red';
            let produit={
                 index : datas[i].index,
                 nom : datas[i].libelle,
                 prix :datas[i].prix,
                }
            localStorage.getItem('cles');
            tab.push(produit)
            console.log(produit);
            localStorage.setItem('cles',JSON.stringify(tab));

            let div = document.createElement('div');
            containerpanier.append(div);
            div.classList.add('divvv')
            let img = document.createElement('img');
            img.classList.add('imggg')
            img.src = datas[i].url;
            div.append(img)
            let div2 = document.createElement('div');
            div.append(div2);
            div2.textContent = datas[i].libelle + ' : ' + datas[i].prix
            let spann = document.createElement('span');
            div.append(spann);
            spann.innerHTML = `<i class="bi bi-trash"></i>`;
        })    
    }

    // button affichage du panier
    btnpanier.addEventListener('click', () => {
      cardd.classList.toggle('hidden')
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

