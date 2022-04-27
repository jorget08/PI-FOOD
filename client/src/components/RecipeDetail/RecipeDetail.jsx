import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getRecipeDetail } from '../../redux/actions';


const RecipeDetail = (props) => {

    const {id} = useParams()
    const recipe = useSelector(state => state.recipeDetail)

    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(getRecipeDetail(id))
    }, [dispatch, id])
    return (
        <div>
            <h1>Henry Food</h1>
            <br/>
            <h2>Recipe</h2>
            <h4>{recipe.title}</h4>
            <img src={recipe.image} alt={recipe.title} />
            <p>{recipe.spoonacularScore}</p>
            <p>{recipe.healthScore}</p>
            <p>{recipe.summary}</p>
            <p>{recipe.diets}</p>
            <p>{recipe.dishTypes}</p>
            <p>{recipe.steps}</p>
        </div>
    )//.join(", ")
}

export default RecipeDetail;
