import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useParams, useHistory } from 'react-router-dom';

const initialMovie = {

    title: '',
    director: '',
    metascore: 0,
    stars: []

};

export const UpdateMovie = (props) => {

    const [movie, setMovie] = useState(initialMovie);
    const location = useLocation();

    const params = useParams();

    const {push} = useHistory();

    useEffect(() => {
        
        if(location.state) {
            setMovie(location.state);
        } else {
            axios
            .get(`http://localhost:5000/api/movies/${params.id}`)
            .then((res) => {
                setMovie(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
        }
 
    }, [location.state, params.id])

    const submitMovie = (e) => {
        e.preventDefault();

        axios
        .put(`http://localhost:5000/api/movies/${params.id}`)
        .then((res) => {
            const newMovie = props.movieList.filter((movie) => movie.id !== params.id);
            newMovie.push(res.data);
            props.setMovieList(newMovie);
            push(`/`);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const handleChange = (e) => {
        let value = e.target.name === 'stars' ? e.target.value.split(',') : e.target.value;

        setMovie({
            ...movie,
            [e.target.name]: value
        });
    }

    return (
        <form onSubmit={submitMovie}>
            <label htmlFor='title'>
                Title: 
                <input 
                    id='title' 
                    name= 'title' 
                    type= 'text' 
                    value= {movie.title} 
                    onChange= {handleChange}
                     /> 
            </label>
            <label htmlFor='director'>
                Director: 
                <input 
                    id='director' 
                    name= 'director' 
                    type= 'text' 
                    value= {movie.director} 
                    onChange= {handleChange}
                     /> 
            </label>
            <label htmlFor='metascore'>
                Metascore: 
                <input 
                    id='metascore' 
                    name= 'metascore' 
                    type= 'number' 
                    value= {movie.metascore} 
                    onChange= {handleChange}
                     /> 
            </label>
            <label htmlFor='stars'>
                Stars: 
                <input 
                    id='stars' 
                    name= 'stars' 
                    type= 'text' 
                    value= {movie.stars.join(',')} 
                    onChange= {handleChange}
                     /> 
            </label>
            <button>Edit Movie</button>
        </form>
    )
}