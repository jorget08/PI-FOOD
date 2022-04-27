const { Router } = require('express');
const router = Router();
const { getAllRecipes } = require('./getInfo/getInfo')

router.get("/", async (req, res, next) => {
    try{
        const {name} = req.query
        const allRecipes = await getAllRecipes()
        if(name){
            let recipes = allRecipes.filter(e => e.title.toLowerCase().includes(name.toString().toLowerCase()))
            recipes.length ? res.status(200).json(recipes) : res.status(404).send("Recipe doesn´t exist")
        }
        else{
            res.status(200).json(allRecipes)
        }
    }
    catch(err){
        next(err)
    }
})


router.get('/:id', async (req, res, next) => {
    try{
        const {id} = req.params
        const allRecipes = await getAllRecipes()
        if(id){
            let recipe = allRecipes.filter(e => e.id == id)
            recipe ? res.status(200).json(recipe) : res.status(404).send("Recipe by ID doesn´t existe")
        }

    }
    catch(err){
        next(err)
    }
})


module.exports = router;