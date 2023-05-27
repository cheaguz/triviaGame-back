const categoryModel = require('../models/Category');


module.exports = {
    getAll : async(req,res,next) => {
        try {
            const category = await categoryModel.find()
            if(category.length === 0){
                return res.send({msg : 'No data'})
            }
            res.json({msg : "Ok" , data : category})
        } catch (error) {
            res.send({msg : "error" , data : error})
        }
    },
    new : async (req, res, next) => {
        try {
            const { name } = req.body
            const category = new categoryModel({name})
            await category.save();
            res.json({msg : 'category created!' , data : category})

        } catch (e) {
            /*  Falta poner respuesta de errores  y checkear el next*/
            if(e.code === 11000){
              return  res.send({msg : 'entry dup', data :'err'})
            }else {
               return res.send({msg: "Hubo un error" , data : 'err'})
            }
        }
    },
   
}