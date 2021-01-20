import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export const AddMovie = (props) => {

    const newMovie = {
        title: '',
        director: '',
        metascore: '',
        stars: []
    }

    const [movie, setMovie] = useState(newMovie);
    const {push} = useHistory();

    const handleChange = (e) => {
        let value = e.target.name === 'stars' ? e.target.value.split(',') : e.target.value;

        setMovie({
            ...movie,
            [e.target.name]: value
        });

    }

    const submitMovie = (e) => {
        e.preventDefault();

        axios
        .post(`http://localhost:5000/api/movies`, movie)
        .then((res) => {
            props.setMovieList(res.data);
            push('/');
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <form onSubmit={submitMovie}>
            <label htmlFor='title'>
                Title: 
                <input 
                    id='title' 
                    name='title' 
                    type='text' 
                    value={movie.title} 
                    onChange={handleChange}
                     />
            </label>
            <label htmlFor='director'>
                Director: 
                <input 
                    id='director' 
                    name='director' 
                    type='text' 
                    value={movie.director} 
                    onChange={handleChange}
                     />
            </label>
            <label htmlFor='metascore'>
                Metascore: 
                <input 
                    id='metascore' 
                    name='metascore' 
                    type='text' 
                    value={movie.metascore} 
                    onChange={handleChange}
                     />
            </label>
            <label htmlFor='stars'>
                Stars: 
                <input 
                    id='stars' 
                    name='stars' 
                    type='text' 
                    value={movie.stars.join(',')} 
                    onChange={handleChange}
                     />
            </label>
            <button>
                Add Movie
            </button>
        </form>
    )
}