import React, { useEffect, useState } from 'react';
import axios from './axios';
import requests from './request';
import './Banner.css';
import PlayMovie from './PlayMovie';

const Banner = () => {
    const [movie, setMovie] = useState([]);

    useEffect(()=> {
        async function fetchData() {
            const request = await axios.get(requests.fetchActionMovies);
            setMovie(request.data.results[Math.floor(Math.random()* request.data.results.length -1)]);
        return request;
        }
        fetchData();
    },[])

    function description(str, n) {
        return str?.length > n ? str.substr(0, n -1) + "..." :str;
    }

    return (
            <header className="banner" 
                style={{
                    backgroundSize: "cover",
                    backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                    backgroundPosition: "center center"
                }} 
                > 
                <div className="banner__contents">
                    <h1 className="banner__title" >
                        {movie?.title || movie?.name || movie?.original_name}
                    </h1>
                    <div className="banner__buttons">
                    </div>
                <h1 className="banner__description" > {description(movie?.overview, 150)} </h1>
                <PlayMovie movies={movie} banner />
                </div>
                <div className="banner--fadeBottom"/>
            </header>
    )
}

export default Banner;
