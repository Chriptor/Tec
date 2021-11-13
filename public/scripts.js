

// token para acceder a los mas vendidos por categoria
const token="APP_USR-3388052911498377-092718-9344154a25951dfb1d6dcf1d9f56b03c-354069378";
// url general para best sellers
const urlBestSell = "https://api.mercadolibre.com/highlights/MLM/category/";
// Url para Electrónica, Audio y Video
let urlElectronica = urlBestSell+"MLM1000?access_token="+token;
// Url Computacion
let urlComputacion = urlBestSell+"MLM1648?access_token="+token;
// Url para Videojuegos
let urlVideojuegos = urlBestSell+"MLM1144?access_token="+token;
// Url para Celulares
let urlCelulares = urlBestSell+"MLM1051?access_token="+token;
// Url para Api Products
let urlProduct="https://api.mercadolibre.com/products/"
//Obtener y mostrar e producto en HTML
async function getProduct(id){
    let url = urlProduct+id;
    const resp = await fetch(url);
    const data = await resp.json(); 
    // console.log(data);
    let products = document.getElementById("products");
    var contenedor = document.createElement("div");
    let descr=data.short_description.content
    let producto = `
  
    <div class="card h-100" style="width: 22rem; margin-top: 19px; padding-bottom: 1rem; padding-top: 1rem;">
    <img src="${data.pictures[0].url}" class="card-img-top" alt="...">
         <div class="card-body">
                <h5 class="card-title">${data.name}</h5>
                <p class="card-text">${descr.split("\n", 1)}</p>
                <p class="card-text">${data.buy_box_winner.price} ${data.buy_box_winner.currency_id}</p>
                <a onclick="carrito(${data})" class="btn btn-primary"> <i class="fas fa-cart-plus"></i></a>
            </div>
    </div>`;
    contenedor.innerHTML += producto
    products.appendChild(contenedor)
    
}


//Obtener los mas vendidos de ciertas categorias
async function getBestSeller(params) {
    let url = params;
    const resp = await fetch(url);
    const data = await resp.json();
    let cont=0
    for (let i=0; i<data.content.length; i++){
            if (data.content[i].type=="PRODUCT"){
                await getProduct(data.content[i].id);
                cont++
            } 
               if (cont==5)i=data.content.length
         }    
}  

    // getBestSeller(urlElectronica)
    // getBestSeller(urlCelulares)
    // getBestSeller(urlComputacion)
    // getBestSeller(urlVideojuegos)

    async function getProductos() {
        const result = await fetch('http://localhost:3001/paises');
        const productos = await result.json();
        console.log(productos);  
    }
    
    
    async function getProductDetail(id){
        let url = urlProduct+id;
        const resp = await fetch(url);
        const data = await resp.json(); 
        let products = document.getElementById("products");
        var contenedor = document.createElement("div");
        
        // contenedor.setAttribute("id", "p" + i);
    
        let descr=data.short_description.content
        let producto = `
      
        <div class="card h-100" style="width: 22rem; margin-top: 19px; padding-bottom: 1rem; padding-top: 1rem;">
        <img style="width: 100px; height: 100px;" src="${data.pictures[0].url}" class="card-img-top" alt="...">
             <div class="card-body">
                    <h5 class="card-title">${data.name}</h5>
                    <p class="card-text">${descr}</p>
                    <p class="card-text">${data.buy_box_winner.price} ${data.buy_box_winner.currency_id}</p>
                    <button onclick="carrito(${data.id})" href="#" class="btn btn-primary"> <i class="fas fa-cart-plus"></i></button>
                </div>
        </div>`;
        contenedor.innerHTML += producto
        products.appendChild(contenedor)
        
    }


getItem=async(id)=>{

    try {
        let url = "https://api.mercadolibre.com/items/"+id;
    const resp = await fetch(url);
    const data = await resp.json();
    console.log(data);
    const resul = {
        id: data.id
    }
    console.log(resul);
    return data
    } catch (error) {
        console.log(error)
    }
    
    
}
getItem("MLA919394331")
getData=async()=>{
    let products=""
    try {
        let url = "https://api.mercadolibre.com/sites/MLM/search?category=MLM1000";
    const resp = await fetch(url);
    const data = await resp.json();
    for (let i=0; i<data.results.length; i++){
        // products = products + await getItem(data.results[i].id)
        // console.log(typeof(data.results[i].id))
    }
    // console.log(typeof(JSON.parse(products)));
    return data
    } catch (error) {
        console.log(error)
    }
    
    
}
