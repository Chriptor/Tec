const jwt = require('jsonwebtoken')
const loginModel = require('loginModel')

module.exports.login = async (user) =>{
    let login = new loginModel();
    let data = await login.find(user)
    if(data){
        let token = jwt.sign({data},process.env.SECRETKEY)
    
        return token  
    }else{
        return "No se encontro usuario"
    }
}
module.exports.addUser = async (user) => {
    let response = new loginModel();
    let data = await response.add(user);
    if(data){
        return "Usuario Registrado papi xdxdxdxd"
    }else{
        return "Nel mijo intentalo de nuevo"
    }
}
module.exports.listUser = async () => {
    let response = new loginModel();
    let result = await response.list();
    return result;
}
module.exports.deleteUser = async (userdelete) => {
    let response = new loginModel();
    let result = await response.delete(userdelete);
    if(!result){
        return "ocurrio un error"
    }else{
        
        return result,"el registro no existe o fue eliminado";
    }
   
}
module.exports.updateuser = async (updateUser) => {
    let response = new loginModel();
    let data = await response.update(updateUser);
    if(data){
        return "Usuario Actualizado papi xdxdxdxd"
    }else{
        return "Nel mijo intentalo de nuevo"
    }
}