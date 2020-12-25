import React, { useState } from 'react';
import Modal from 'react-modal';
import movieTrailer from 'movie-trailer';
import YouTube from 'react-youtube';
import ClipLoader from "react-spinners/ClipLoader";
import './PlayMovie.css';


const base_url = 'https://image.tmdb.org/t/p/original/';

const PlayMovie = ({movies, banner}) => {
    const [trailerUrl, setTrailerUrl] = useState(null);
    const [modalOpen, setModalopen] = useState(false);
    const [herror, setHerror] = useState('');
    const [movieData, setMovieData] = useState({});

    const opts = {
        height: '300',
        playerVars: {
            autoplay: false,
        }
    }

    const handleClick = (movie) => {
            setMovieData(movie);
        if (trailerUrl) {
            setTrailerUrl(null);
        }else {
            movieTrailer(movie?.name || movie?.title || '').then((url) => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get("v"));
            })
            .catch((error) => setHerror(true));
        }
    }

    const closeHandler = () => {
        setModalopen(false);
        setHerror(false);
        setTrailerUrl(null);
    }

    const styleHandle = {
        style : {
            overlay: {
                backgroundColor: 'rgba(17,17,17,0.9)'
            },
            content: {
                background: 'rgba(52,58,64,0.9)'
            }
        }
    }

    return (
        <div className="row">
            <div className="row__posters">
                {banner 
                ? 
                <button className="row__bannerButton" onClick={() => handleClick(movies, setModalopen(true))} >MORE</button> 
                : 
                movies.map((movie)=> (
                    <img 
                    key={movie.id}
                    className="row__poster"
                    onClick={() => handleClick(movie, setModalopen(true))}
                    src={`${base_url}${movie.poster_path}`} 
                    alt={movie.name} 
                    />
                ))}
            </div>
            <Modal {...styleHandle} isOpen={modalOpen} >
                <div className="row__modal" >
                    {!trailerUrl && <YouTube /> ? <ClipLoader size={75} color={"#fff"} /> : trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
                    {herror ? <p className="row__modalError" >At the moment the title is not available, try later or try another title</p> : null}
                    <div className="row__modalDescription">
                        <h2> {movieData?.title || movieData?.name} </h2>
                        <p> {movieData?.overview} </p>
                        <h3> Rating: {movieData?.vote_average} </h3>
                    </div>
                    <button onClick={closeHandler}>CLOSE</button>
                </div>
            </Modal>
        </div>
    )
}

export default PlayMovie;