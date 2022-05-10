const { Router } = require('express');
const { Recipe, Type } = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const recipesRoutes = require('./recipes')
const typeRoutes = require('./type')
//const {getAllRecipes } = require('./getInfo/getInfo')

const fs = require("fs")


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/recipes", recipesRoutes)
router.use("/types", typeRoutes)


router.post('/recipe', async (req, res, next) => {
    try{
        const { title, summary, spoonacularScore, healthyLevel, steps, diets, image } = req.body
        const recipeCreated = await Recipe.create({
            title,
            summary,
            spoonacularScore,
            healthyLevel,
            steps,
            image
        })
        for (let i = 0; i < diets.length; i++) {
            const diet = await Type.findOne({
                where: {name: diets[i]}
            })
            recipeCreated.addType(diet)
        }
        res.status(201).send("Recipe created successfully")
    }
    catch(err){
        next(err)
    }
})

router.put('/recipe/:id', async (req, res, next) => {
    try{
        const {id} = req.params
        const {title, summary, spoonacularScore, healthyLevel, steps, diets, image } = req.body
        //const allRecipes = await getAllRecipes()
        if(id){
            
            if(title){
                await Recipe.update({
                    title: title
                },{
                    where: {id: id}
                })
            }
            if(summary){
                await Recipe.update({
                    summary: summary
                },{
                    where: {id: id}
                })
            }
            if(spoonacularScore){
                await Recipe.update({
                    spoonacularScore: spoonacularScore
                },{
                    where: {id: id}
                })
            }
            if(healthyLevel){
                await Recipe.update({
                    healthyLevel: healthyLevel
                },{
                    where: {id: id}
                })
            }
            if(steps){ 
                await Recipe.update({
                    steps: steps
                },{
                    where: {id: id}
                })
            }
            if(image){ 
                await Recipe.update({
                    image: image
                },{
                    where: {id: id}
                })
            }
            res.send("Se actualizo")
            // if(diets !== ""){
            //     await Recipe.update({
            //         diets: diets
            //     },{
            //         where: {id: id}
            //     })
            // }
        }
    }
    catch(err){
        next(err)
    }
})

module.exports = router;
