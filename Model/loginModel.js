const sequelize = require('../db/conexion');

module.exports = class loginsModel {
    constructor(login){
        this.login = login
    }
   
    async find (user){
        let result = await sequelize.query("SELECT [user],[password],email,[name] FROM users WHERE email = '"+user.email+"' AND [password] = '"+user.password+"';");
        
        if(user.email == result[0][0].email){
            
            return result[0][0]
        }else{
            return false
        }
        
    }
    async add (user){
        let result = await sequelize.query("INSERT INTO users([user],email,[password],[name])VALUES('"+user.user+"','"+user.email+"','"+user.password+"','"+user.name+"');");
        return result;
    }
    async list (){
        let result = await sequelize.query("SELECT * FROM users");
        return result;
    }
    async delete (userdelete){
        let result = await sequelize.query("DELETE FROM users WHERE [user]='"+userdelete+"';");
        return result;
    }
    async update (updateuser){
        let result = await sequelize.query("UPDATE users SET [user] = '"+updateuser.user+"' WHERE [name] = '"+updateuser.name+"';");
        return result;
    }
}