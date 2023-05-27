const userModel = require('../models/User');


module.exports = {
    register: async (req, res, next) => {
        try {
            const { user,name,password,email } = req.body
            const newUser = new userModel({user ,name ,password ,email });
            await newUser.save();
            res.status(200).send({msg : 'User created!' , data : newUser.user})
        } catch (e) {
            /*  Falta poner respuesta de errores  y checkear el next*/
            if(e.code === 11000){
              return  res.status(400).send({msg : 'error el mail ya se encuentra registrado', data :'err'})
            }else {
               return res.status(500).send({msg: "Hubo un error" , data : 'err'})
            }
        }
    },
    getUsers : async(req,res,next) => {
        try {
            const users = await userModel.find()
            if(users.length === 0){
                return res.send({msg : 'No data', data : users})
            }
            res.json({msg : "Ok" , data : users})
        } catch (error) {
            res.send({msg : "error" , data : error})
            
        }
    },
    login : async (req, res, next) => {
        try {
            const {email , password} = req.body;
            console.log(email,password)
            const user = await userModel.findOne( {email} )
            if(user){
                if(user.password == password ){           
                    res.status(200).send({msg : "Logged!" , data : { token : 123 , id : user._id, user : user.user}})
                }else{
                    res.status(400).send({msg : "password incorrecto"})
                }
            }else{
                res.status(400).send({msg : "usuario no encontrado"})
            } 
        }catch(e){
            res.status(500).send({msg : "error" , data : e})
        }
    },
}