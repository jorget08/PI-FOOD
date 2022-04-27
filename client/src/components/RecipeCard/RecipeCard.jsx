import React from 'react';
import { Link } from 'react-router-dom';


const RecipeCard = ({id, title, image, healthScore, spoonacularScore, diets}) => {
    
    return(
        <>
                <div>
                <Link to={`/recipes/detail/${id}`}>
                    <h4>Recipe: {title}</h4>
                </Link>
                <img src={image} alt={title} />
                <p>Healthy: {healthScore}</p>
                <p>Score: {spoonacularScore}</p>
                <p>Diet: {diets}</p>
            </div>
        </>
    )
}


export default RecipeCard;