const { Router } = require('express');
const { Recipe, Type } = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const recipesRoutes = require('./recipes')
const typeRoutes = require('./type')


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/recipes", recipesRoutes)
router.use("/types", typeRoutes)

// router.get('/', (req, res, next) => {
    
// })

router.post('/recipe', async (req, res, next) => {
    try{
        const { title, summary, score, healthyLevel, steps, diets } = req.body
        const recipeCreated = await Recipe.create({
            title,
            summary,
            score,
            healthyLevel,
            steps
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

module.exports = router;
