import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAllRecipes } from '../../redux/actions';
import RecipeCard from '../RecipeCard/RecipeCard';
import Paginate from '../Paginate/Paginate';


const Home = () => {

    //states
    const recipes = useSelector(state => state.recipes)
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [recipePerPage] = useState(9);

    //pagination
    const indexLastRecipe = currentPage * recipePerPage
    const indexFirstRecipe = indexLastRecipe - recipePerPage
    const currentRecipe = recipes.slice(indexFirstRecipe, indexLastRecipe)

    const dispatch = useDispatch()

    useEffect(() => {
        setLoading(true);
        dispatch(getAllRecipes())
        setLoading(false);
    }, [dispatch])

    if(loading){
        return <h2>Cargando...</h2>
    }

    //change page
    const paginat = (pageNumber) => setCurrentPage(pageNumber)
    
//id, title, image, healthScore, spoonacularScore, diets
    return (
        <div>
            <h1>Henry Food</h1>
            <br/>
            <h2>Recipes</h2>
            {currentRecipe?.map(r => {
                return <RecipeCard
                key = {r.id}
                id = {r.id}
                title = {r.title}
                image = {r.image}
                healthScore = {r.healthScore}
                spoonacularScore = {r.spoonacularScore}
                diets = {r.diets}/>
            })}
            <Paginate recipePerPage={recipePerPage} totalRecipes={recipes.length} paginat={paginat} />
        </div>
    )
}

export default Home;
