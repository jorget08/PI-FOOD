const axios = require("axios");
const { Recipe, Type } = require("../../db");
const { apiKey, apiKey2, apiKey3, apiKey4, apiKey5 } = process.env;


const getApiRecipes = async() =>{

    const apiInfo = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey5}&addRecipeInformation=true&number=5`)
    const apiRecipes = apiInfo.data?.results.map(e => {
        return {
            id: e.id,
            title: e.title,
            image: e.image,
            summary: e.summary.replace(/(<([^>]+)>)/gi, ''),
            spoonacularScore: e.spoonacularScore,
            healthScore: e.healthScore,
            diets: e.diets,
            dishTypes: e.dishTypes, 
            steps: e.analyzedInstructions[0]?.steps.map(each => { return each.step })
        }
    })
    return apiRecipes
}


const getDataBaseInfo = async () => {
    return await Recipe.findAll({
        include: {
            model: Type,
            attributes: ["name"],//include el modelo Diet para que se genere la relacion
            through: {
                attributes: []//mediente los atributos ->  me traeria todos en caso de que fueran más sin la comprobacion through
            } 
        }
     })
    }


const getAllRecipes = async () => {
    const [apiRecipes2, dbInfo2] = await Promise.all([getApiRecipes(), getDataBaseInfo()])
    return [...apiRecipes2, ...dbInfo2]
}

const createTypes = async() => {
    const apiInfo = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey5}&addRecipeInformation=true&number=5`)
    const diets = await apiInfo.data.results.map(e => {
        return e.diets
    })
    const result = diets.flat()
    const result2 = new Set(result)
    const result3 = [...result2]
    const result4 = result3.map(e => {return {name: e}})
    await Type.bulkCreate(result4)
  }

module.exports = {
    getAllRecipes,
    getApiRecipes,
    getDataBaseInfo,
    createTypes
}