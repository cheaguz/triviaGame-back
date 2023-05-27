const questionModel = require('../models/Questions');
const categoryModel = require('../models/Category');
const userModel = require('../models/User');
const rankingModel = require('../models/Ranking')


module.exports = {
    getAll : async(req,res,next) => {
        try{
            const questions = await questionModel.find().populate("id_category")
            res.json({msg : 'success' , data : questions})
        }catch(e){
            res.send({msg : 'err' , data : 'hubo un error..'})
        }
    },
    new : async (req,res,next) => {
        try {
            const { id_category,question,correctAnswer,answers,image } = req.body
            const questions = await questionModel.find({id_category : req.body.id_category});
            //verificar
            const lvl =  questions.length + 1

            const category = await categoryModel.find({id_category})
            if(!category){
                res.send({msg : 'category not found'})
            }
            else if(answers.length > 5 || answers.length < 5){
                res.send({msg : 'answers debe tener 5 opciones'})
            }else {
                const newQuestion = await new questionModel({
                    id_category,
                    question ,
                    correctAnswer, 
                    answers,
                    image ,
                    level : lvl
                })
                await newQuestion.save();
                res.json({msg : 'sucess' , data : newQuestion})   
            }   
                                
        } catch (e) {
            if(e.code === 11000){
                //cambiar el error
                return  res.send({msg : 'error , el usuario ya se encuentra en el ranking', data :e.message})
              }else {
                
                 return res.send({msg: "Hubo un error" , data : 'err'})
              }
        }
    },
    getByCategory : async (req,res,next) => {
        try{
           const quest = await questionModel.find( {id_category: req.params.id }).populate('id_category');
           
           if(quest.length === 0 ){
            return res.send({msg : 'questions not found'})
           }
           //modificar la data para quitar la respuesta correcta!
           res.status(201).json({msg : 'sucess' , data : quest[0]})
        }catch(e){
            res.send({msg: "Hubo un error" , data : 'err'})
        }
    },
    validateResponse : async (req,res,next) => {
        try{
            const quest = await questionModel.find({_id : req.params.id})
            const questAnswer =  quest[0].correctAnswer;
            const idCategory = quest[0].id_category
            const nextLevel = quest[0].level + 1
            const userId = req.body.userId;
            console.log('userID',userId)
            if(nextLevel === 3){
                const user = await rankingModel.find({id_user : userId});
                const points = user[0].points
                console.log('points',points)
                const rank = await rankingModel.update({id_user : userId},{points :points+10,best_time: 1.12},{multi : false})                
                res.json({msg : "Felicidades sumaste 10 puntos al ranking" })
            }
            else if(questAnswer == req.body.userResponse){
                const nQuestion = await questionModel.find({id_category : idCategory})
                res.send({msg : "Correcto!" , data : nQuestion[nextLevel]})
            }else{
                res.send({msg : "Incorrecto" , data : ''})
            }
            
        }catch(e){
            res.send({msg: "Hubo un error" , data : 'err'})
            console.log(e)
            
        }
        
        
        
    },
}