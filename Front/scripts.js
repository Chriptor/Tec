
// token para acceder a los mas vendidos por categoria
const token="APP_USR-3388052911498377-090619-2e5e072a2f36b49b88db000f06f3c9e1-354069378";
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
    let products = document.getElementById("products");
    var contenedor = document.createElement("div");
    
    // contenedor.setAttribute("id", "p" + i);

    let descr=data.short_description.content
    let producto = `
  
    <div class="card h-100" style="width: 22rem; margin-top: 19px; padding-bottom: 1rem; padding-top: 1rem;">
    <img src="${data.pictures[0].url}" class="card-img-top" alt="...">
         <div class="card-body">
                <h5 class="card-title">${data.name}</h5>
                <p class="card-text">${descr.split("\n", 1)}</p>
                <p class="card-text">${data.buy_box_winner.price} ${data.buy_box_winner.currency_id}</p>
                <a href="#" class="btn btn-primary" onclick="`+agregarProducto(data.id)+`"> <i class="fas fa-cart-plus"></i></a>
            </div>
    </div>`;
    contenedor.innerHTML += producto
    products.appendChild(contenedor)
    
}
//Obtener categorias para el navbar en ¡¡¡ construccion 
async function getCategorias() {
    let url = params;
    const resp = await fetch(url);
    const data = await resp.json();
    let cont=0
    
}
//Obtener los mas vendidos de ciertas categorias
async function getBestSeller(params) {
    let url = params;
    const resp = await fetch(url);
    const data = await resp.json();
    let cont=0
    for (let i=0; i<data.content.length; i++){
            if (data.content[i].type=="PRODUCT"){
                // console.log(data.content[i].id)
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
    
    // async function getPaises() {
    //     const result = await fetch('http://localhost:3001/paises');
    //     const paises = await result.json();
    //     console.log(paises.MX);  
    // }
    // getPaises()

    function hola(){console.log("boton")}
    
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
        <img src="${data.pictures[0].url}" class="card-img-top" alt="...">
             <div class="card-body">
                    <h5 class="card-title">${data.name}</h5>
                    <p class="card-text">${descr}</p>
                    <p class="card-text">${data.buy_box_winner.price} ${data.buy_box_winner.currency_id}</p>
                    <a href="#" class="btn btn-primary" onclick="agregarProducto(${data})"> <i class="fas fa-cart-plus"></i></a>
                </div>
        </div>`;
        contenedor.innerHTML += producto
        products.appendChild(contenedor)
        
    }
    async function getCart() {
        const result = await fetch('http://localhost:3001/cart');
        const cart = await result.json();
        console.log(cart);  
    }
    
    
    
    
    
    async function agregarProducto(Articulo) {
        await fetch('http://localhost:3001/cart', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(Articulo)
        });
        console.log("Agregado")
    }
    async function eliminarProducto(id) {
        await fetch('http://localhost:3001/cart/'+ id);
        const cart = getCart();
        return cart
    }
    
    
    
    let Articulo = {
        id:"KIKIww1",
        nombre: "Tenis Nike",
        cantidad: 1,
        precio: 500,
        clave:"Una clave para protegernos a todos"
    }
    
    