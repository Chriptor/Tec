const { getData } = require("../pruba");

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

    getBestSeller(urlElectronica)
    getBestSeller(urlCelulares)
    getBestSeller(urlComputacion)
    getBestSeller(urlVideojuegos)

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

    // async function carrito(id){
    //     let url = urlProduct+id;
    //     const resp = await fetch(url);
    //     const data = await resp.json(); 
    //     console.log("hola")
    //     if(!data.id||!data.name||!data.buy_box_winner.price){
    //         console.log("no hay nada ")
    //     }else{
    //         if(data.id == id){
    //             let products = document.getElementById("car");
    //             var contenedor = document.createElement("div");
    //             let descr=data.short_description.content
    //             let producto = `
              
    //             <div class="row">
    //             <div class="col-sm-12" >
    //               <h5 style="color: white; ">${data.name}</h5>
    //               <div class="row">
    //                 <div class="col-4 col-sm-2">
    //                   <img style="width: 100px; height: 100px;" src="https://www.sams.com.mx/images/product-images/img_small/980023267s.jpg" alt="">
    //                 </div>
    //                 <div class="col-2 col-sm-3" style="display: flex; align-items: center; ">
    //                   <p style="color: white; text-align: justify;">Caracteristicas de bla bla bla bla bal abla ablab abla abla bal abla alba lba bla</p>
    //                 </div>
    //                 <div class="col-2 col-sm-2" style="display: flex; align-items: center;">
    //                   <p style="color: white;">Cantidad: 1</p>
    //                 </div>
    //                 <div class="col-2 col-sm-2" style="display: flex; align-items: center;">
    //                   <p style="color: white;">Precio: $350</p>
    //                 </div>
                    
    //                 <div class="col-0 col-sm-2 nav-item" style="display: flex; align-items: center; justify-content: center;">
    //                   <a style="background-color: rgb(255, 196, 0);" class="btn btn-block" ><i class="fa fa-minus"</i></i></a>
    //                   <p>.</p>
    //                   <a style="background-color: rgb(255, 196, 0);" class="btn btn-block" ><i class="fa fa-plus"></i></i></a>
    //                   <p>.</p>
    //                   <a style="background-color: rgb(255, 196, 0);" class="btn btn-block" ><i class="fa fa-window-close"></i></i></a>

    //                 </div>
    //               </div>
    //             </div>
    //           </div>`;
            
    //             contenedor.innerHTML += producto
    //             products.appendChild(contenedor)
    //         }
    //     }
    // }
    
// async function agregarProducto(Articulo) {
//     await fetch('http://localhost:3000/cart', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(Articulo)
//     });
 
// }
// async function eliminarProducto(id) {
//     await fetch('http://localhost:3000/cart/'+ id);
//     const cart = getCart();
//     return cart
// }



// let Articulo = {
//     id:"KIKIww1",
//     nombre: "Tenis Nike",
//     cantidad: 1,
//     precio: 500,
//     clave:"Una clave para protegernos a todos"
// }

// agregarProducto(Articulo)

getData=async()=>{

    try {
        let url = "https://api.mercadolibre.com/sites/MLA/search?q=Motorola%20G6";
    const resp = await fetch(url);
    const data = await resp.json();
    console.log(data)
    return data
    } catch (error) {
        console.log(error)
    }
    
    
}
getData()