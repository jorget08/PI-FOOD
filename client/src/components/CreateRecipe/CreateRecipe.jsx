import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createRecipe, getTypes } from '../../redux/actions';
import NavBar from '../NavBar/NavBar';
//import { useNavigate } from "react-router-dom"


function validate(input) {
    let errors = {};
    if (!input.title) {
        errors.title = "The name of recipe is required";
    } else if (!input.summary) {
        errors.summary = "Summary is required";
    } else if (input.score > 100 || input.score < 0) {
        errors.score = "The score has to be lower than 100";
    } else if (input.healthyLevel > 100 || input.healthyLevel < 0) {
        errors.healthyLevel = "The healt has to be lower than 100";
    }
    return errors;
}

const CreateRecipe = () => {
    const dispatch = useDispatch()
    const types = useSelector(state => state.types)
    const [errors, setError] = useState({})

    //const navigate = useNavigate()

    const [input, setInput] = useState({
        title: "",
        summary: "",
        //image: "",
        score: 0,
        healthyLevel: 0,
        steps: "",
        diets: [],
    })


    useEffect(() => {
        dispatch(getTypes())
        }, [dispatch]);


    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setError(
            validate({
                ...input,
                [e.target.name]: e.target.value,  
            })
        );
    }


    function handleSelect(e) {
        setInput({
            ...input,
            diets: [...input.diets, e.target.value]
        })
    }

    function handleSubmit(e) { 
        if(!input.title || !input.summary){
            e.preventDefault()
            //return alert("Papi nombre y resumen, crees que lo puse por adorno que?")
        } else if(!input.diets.length){
            e.preventDefault()
            //return alert("Osea, tu crees que busque las dietas en la db para ponertelas por diversion?")
        }else{
            e.preventDefault()
        dispatch(createRecipe(input))
        alert('Recipe sucessfuly created!!!')
        setInput({
            title: "",
            summary: "",
            //image: "",
            score: 0,
            healthyLevel: 0,
            steps: "",
            diets: [],
        })
        //navigate("/home")
    }
    }

  return (
    <div>
        <NavBar></NavBar>
        <form onSubmit={(e) => handleSubmit(e)}>
            <h2>Create your recipe</h2>
            <div>
                <p>Recipe Name:</p>
                <input type="text"  value={input.title} name="title" onChange={(e) => handleChange(e)} />
                {errors.title && <p>{errors.title}</p>}
            </div>
            <div>
                <p>Recipe summary</p>
                <textarea type="text" value={input.summary} name="summary" onChange={(e) => handleChange(e)} />
                {errors.summary && <p> {errors.summary}</p>}
            </div>
            <div>
                <p>Recipe Score:</p>
                <input type="number"  value={input.score} name="score" onChange={(e) => handleChange(e)} />
                {errors.score && <p> {errors.score}</p>}
            </div>
            <div>
                <p>Recipe Healthy score:</p>
                <input type="number"  value={input.healthyLevel} name="healthyLevel" onChange={(e) => handleChange(e)} />
                {errors.healthyLevel && <p>{errors.healthyLevel}</p>}
            </div>
            <div>
                <p>Steps</p>
                <textarea type="text" value={input.steps} name="steps" onChange={(e) => handleChange(e)} />
            </div>
            <div>
                <p>Diets</p>
                <select name="diets" value={input.diets} multiple onChange={(e) => handleSelect(e)}>
                    {types.map((t, index) => {
                       return <option key={index} value={t.name}>{t.name}</option>
                    })}
                </select>
            </div>
            <div>
                <button type="submit">Create Recipe</button>
            </div>
        </form>
    </div>
  )
}

export default CreateRecipe