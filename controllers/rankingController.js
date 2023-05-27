const rankingModel = require('../models/Ranking');
const userModel = require('../models/User');


module.exports = {
    getAll : async(req,res,next) => {
        try{
            const ranking = await rankingModel.find().populate('id_user','user')
            res.json({msg : 'ok' , data : ranking})
        }catch(e){
            res.send({msg : 'err' , data : 'hubo un error..'})
        }
    },
    new : async (req,res,next) => {
        try {
            const { id_user,points,best_time } = req.body;
            const  user = await userModel.findById(id_user);
            if(!user){
                res.send({msg : 'user not found'})
            }else {
                const newRanking = await new rankingModel({
                    id_user ,
                    points ,
                    best_time : parseFloat(best_time) 
                })
                await newRanking.save();
                res.json({msg : 'success!' , data : newRanking })
            }
        } catch (e) {
            if(e.code === 11000){
                return  res.send({msg : 'error , el usuario ya se encuentra en el ranking', data :e.message})
              }else {
                 return res.send({msg: "Hubo un error" , data : 'err'})
              }
        }
    }
}