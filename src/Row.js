import React, { useState, useEffect } from 'react';
import axios from './axios';
import PlayMovie from './PlayMovie';
import './Row.css';



const Row = ({title, fetchUrl}) => {
    const [movies, setMovies] = useState([]);
    

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    },[fetchUrl]);

   
    return (
        <>
        <div className="row" >
            <h2> {title} </h2>
                <PlayMovie movies={movies} />
        </div>
        </>
    )
}

export default Row;