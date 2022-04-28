import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAllRecipes, filterByName } from '../../redux/actions';
import RecipeCard from '../RecipeCard/RecipeCard';
import Paginate from '../Paginate/Paginate';
import SearchBar from '../SearchBar/SearchBar';
import NavBar from '../NavBar/NavBar';


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

    const [orden, setOrden] = useState('')

    useEffect(() => {
        setLoading(true);
        dispatch(getAllRecipes())
        setLoading(false);
    }, [dispatch])

    if(loading){
        return <h2>Cargando...</h2>
    }

    function handleOrderByName(e){
        e.preventDefault()
        dispatch(filterByName(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`) //al cambiar un estado local se reenderiza la pag
                                               // y ya con eso se actualizan los estados globales
    }

    //change page
    const paginat = (pageNumber) => setCurrentPage(pageNumber)
    
    return (
        <div>
            <NavBar></NavBar>
            <SearchBar></SearchBar>
            <select onChange={(e) => handleOrderByName(e)}>
                <option value="" >Select Order</option>
                <option value="asc">Ascendent</option>
                <option value="desc">Descendent</option>
            </select>
            <h1>Henry Food</h1>
            <br/>
            <h2>Recipes</h2>
            {currentRecipe?.map(r => {
                return <RecipeCard
                key = {r.id}
                id = {r.id}
                title = {r.title}
                image = {r.image}
                healthScore = {r.healthScore ? r.healthScore : r.healthyLevel}
                spoonacularScore = {r.spoonacularScore ? r.spoonacularScore : r.score}
                diets =  {r.types ? r.types.map(e => e.name) : r.diets}/>
            })}
            <Paginate recipePerPage={recipePerPage} totalRecipes={recipes.length} paginat={paginat} />
        </div>
    )
}

export default Home;
