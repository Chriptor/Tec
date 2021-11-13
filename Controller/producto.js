const Product = require('../model/product')

module.exports.guardarProductos = async(req,res)=>{
    
    getItem=async(id)=>{
    
        try {
            let url = "https://api.mercadolibre.com/items/"+id;
            const resp = await fetch(url);
            const data = await resp.json();
            const resul= {id: data.id,nombre: data.title, precio: data.price, imagen:data.thumbnail}
        
        return resul
        } catch (error) {
            console.log(error)
        }
        
        
    }
    // getItem("MLA919394331")
    getData=async()=>{
        let products=[]
        try {
            let url = "https://api.mercadolibre.com/sites/MLM/search?category=MLM1000";
        const resp = await fetch(url);
        const data = await resp.json();
        for (let i=0; i<data.results.length; i++){
            products.push(await getItem(data.results[i].id))
            // console.log(typeof(data.results[i].id))
        }
        console.log(products);
        // console.log(typeof(JSON.parse(products)));
        return products
        } catch (error) {
            console.log(error)
        }
        
        
    }
    // getData()
    user=getData()
try {
    const userDB = await user.save();
    
    res
    .status(201)
    .redirect(301, '/LogIn1')
} catch (error) {
    res.status(400).json(error ) 
       
}
}

