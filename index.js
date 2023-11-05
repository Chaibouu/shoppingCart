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
let clearCart = document.querySelector('.clearCart');
let panier = document.querySelector('.panier');
let prixTotalPanier = document.querySelector('.prixTotalPanier');
let confirm = document.querySelector('.confirm');
let containerAffichPlante = document.querySelector('.containerAffichPlante');
let sortieCaisse = document.querySelector('.sortieCaisse');
let Cclose = document.querySelector('.Cclose');
let NombreItems = document.querySelector('.NombreItems');

// initialisation du tableau
if(!localStorage.getItem('cles')){
    localStorage.setItem('cles',JSON.stringify([]))
}

let tab = JSON.parse(localStorage.getItem('cles'));

// fonctionnalité pour afficher le nombre de produit dans le panier
NombreItems.textContent = tab.length + " Items :";

// function pour ajouter des info au panier
function infopanier() {
    let tabb = JSON.parse(localStorage.getItem('cles'));
    containerpanier.innerHTML= '';
    tabb.forEach(element => {
        let div = document.createElement('div');
        containerpanier.append(div);
        div.classList.add('divvv')
        let img = document.createElement('img');
        img.classList.add('imggg')
        img.src = element.url;
        div.append(img)
        let div2 = document.createElement('div');
        div.append(div2);
        div2.textContent =element.quantiter + ' X ' + element.nom + ' : ' + element.prix
        let spann = document.createElement('span');
        div.append(spann);
        spann.innerHTML = `<i class="bi bi-trash"><span class="hidden"> ${element.index}</span></i>`;
     });
     
     // button supprimer produit dans panier
     let sup = document.querySelectorAll('.bi-trash');
     let tabbb = JSON.parse(localStorage.getItem('cles'));
     sup.forEach((element,indexx) =>{
        element.style.cursor = 'pointer';
         element.addEventListener('click',(e)=>{ 
            let tt = element.textContent;
            let asup = e.target.parentElement.parentElement;
            asup.remove();
            tabFilter=[];
            tabbb.forEach((element) =>{
                if (element.index != tt){
                    tabFilter.push(element);
                    tabbb = tabFilter;
                }
            })
            localStorage.setItem('cles',JSON.stringify(tabbb));
            infopanier();
            const total = ()=>{
                let total=0;
                for(let i =0; i<tabbb.length;i++){
                    total = Number(total) + Number(tab[i].prix)
                }
                return total;
            }
            total();
            panier.textContent = total() + ' F CFA';
            prixTotalPanier.textContent = 'Total  : ' + total() + ' F CFA';
            // fonctionnalité pour afficher le nombre de produit dans le panier
            NombreItems.textContent = tabbb.length + " Items :";
         })
         
     });
    //  button clear cart pour restore le localstorage
    clearCart.addEventListener('click',()=>{
        localStorage.clear();
        document.location.reload();
    })
    
}
// fonction permettent d'ajouter le total du panier
function affTotal(){
    const total = ()=>{
        let total=0;
        for(let i =0; i<tab.length;i++){
            total = Number(total) + Number(tab[i].prix)
        }
        return total;
    }
    total();
    panier.textContent = total() + ' F CFA';
    prixTotalPanier.textContent = 'Total  : ' + total() + ' F CFA';
}
affTotal()
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
    let produit={
        index : 0,
        nom : '',
        prix : 0,
        url : '',
        quantiter : 0,
       }
    for (let i = 0; i < iconajoute.length; i++) {
        iconajoute[i].style.cursor= 'pointer';
        iconajoute[i].addEventListener('click',()=>{
            produit={
                index : datas[i].index,
                nom : datas[i].libelle,
                prix : datas[i].prix,
                url : datas[i].url,
                quantiter : 1,
            }
          
            let filtreta = tab.find((ta)=>ta.index == produit.index);
            if (filtreta) {
                filtreta.prix += produit.prix;
                filtreta.quantiter ++;
                updateTab() 
                infopanier();
                affTotal()
                // fonctionnalité pour afficher le nombre de produit dans le panier
                NombreItems.textContent = tab.length + " Items :";
            }
            else{
                tab.push(produit)
                // function mettre a jour localstorage
                updateTab() 
                // function pour ajouter des info au panier
                infopanier();
                 affTotal()
                 // fonctionnalité pour afficher le nombre de produit dans le panier
                NombreItems.textContent = tab.length + " Items :";
            }
            confirm.style.display = 'block'
            setTimeout(() => {
                confirm.style.display = 'none'
                
            }, 2000);
        
        })    
    }
    // button affichage du panier
    btnpanier.addEventListener('click', () => {
      cardd.classList.toggle('hidden')
    });
    // fonctionnaliter afficher les images et background blanc
    let afficcard = document.querySelectorAll('.card-img-top');
    afficcard.forEach(element => {
        element.style.cursor = "pointer"
        element.addEventListener('click',()=>{
            containerAffichPlante.style.display = 'block'
            sortieCaisse.style.display = 'block'
        })
    });
    // fonctionnaliter Cclose pour fermer le visionnage d'image des plante
    Cclose.addEventListener('click',()=>{
        containerAffichPlante.style.display = 'none'
        sortieCaisse.style.display = 'none'
        Cclose.style.cursor = "pointer"
    })
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
        const fil = datas.filter((element) => element.libelle.toUpperCase() == inputsearch.value.toUpperCase());
        containercarte.innerHTML ="";
        afficheProduit(fil);
        console.log(inputsearch.value);
        console.log(fil);
        inputsearch.value =""
    }
    console.log('gshfcsdvwfdwsvc')

})


// button pour gérer les étoile

let btnEtoile = document.querySelectorAll('.btnEtoile')
btnEtoile.forEach(element => {
    element.addEventListener('click', ()=>{
        element.classList.remove('fa-regular');
        element.classList.remove('fa-star');
        element.setAttribute('class','fa-solid fa-star')
        element.classList.add('colorEtoile')
    })
});

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


// function pour ajouter des info au panier
infopanier()
// function mettre a jour localstorage
function updateTab() {
    localStorage.setItem('cles',JSON.stringify(tab))
}
/* comentaire  1 */
// commantaire 2