import React from 'react';
import { Transition } from 'react-transition-group';

import CircularProgress from '@material-ui/core/CircularProgress';

import Header from "./components/layout/Header";
import GenresNav from "./components/GenresNav";
import Gallery from "./components/Gallery";
import DetailedCard from "./components/DetailedCard";

import {
    fetchGenres,
    fetchMovieDataById,
    fetchMoviesByGenreId
} from "./api/apiService";

import style from './App.module.scss';

class App extends React.Component {
    state = {
        genreList: null,
        movieList: null,
        selectedMovie: null,
        focusMovie: null,
        focusGenresNav: false,
        previouslyFocusedMovie: null
    }

    selectedGenreId = 1; // initial value

    componentDidMount() {
        this.getData();
    }

    getData = async () => {
        const genres = await fetchGenres();
        genres[this.selectedGenreId].selected = true;
        const movies = await fetchMoviesByGenreId(this.selectedGenreId);

        this.setState({
            genreList: genres,
            movieList: movies
        })
    }

    onMovieSelect = async (id) => {
        const response = await fetchMovieDataById(id);
        this.setState({
            selectedMovie: response,
            previouslyFocusedMovie: id,
            focusMovie: null
        })
    }

    onGenreSelect = async (id) => {
        const movies = await fetchMoviesByGenreId(id);
        const genres = this.state.genreList;
        genres[this.selectedGenreId].selected = false; // set previous genre to inactive
        genres[id].selected = true; // set current genre to selected
        this.selectedGenreId = id; // update actual selected genre id

        this.setState({
            movieList: movies,
            genreList: genres,
            focusMovie: movies[0].id,
            selectedMovie: null
        })
    }

    closeDetailedCard = () => {
        this.setState({
            selectedMovie: null,
            focusMovie: this.state.previouslyFocusedMovie,
            previouslyFocusedMovie: null
        })
    }

    focusGenresNav = () => {
        this.setState({
            focusMovie: null,
            focusGenresNav: true
        })
    }

    renderDetailedMovieInfo(data) {
        if (data) {
            return (
                <div style={{ width: this.calcSlideoutMenuWidth() }} className={style.slideoutMenu}>
                    <DetailedCard onClose={this.closeDetailedCard} data={data}/>
                </div>
            )
        }
    }

    calcSlideoutMenuWidth() {
        const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        return windowWidth * 0.7
    }

    transitionStyles = {
        entering: { transform: `translateX(-${this.calcSlideoutMenuWidth()}px)` },
        entered: { transform: `translateX(-${this.calcSlideoutMenuWidth()}px)` },
        exiting: { transform: 'translateX(0px)' },
        exited: { transform: 'translateX(0px)' }
    };

    render() {
        const { genreList, movieList, selectedMovie, focusMovie, focusGenresNav } = this.state;

        if (genreList !== null && movieList !== null) {
            return (
                <div className={style.container}>
                    <Transition in={selectedMovie !== null} timeout={200}>
                        {state => (
                            <div className={style.slideoutContainer} style={{
                                transition: `transform 200ms ease-in-out`,
                                transform: 'translateX(0px)',
                                ...this.transitionStyles[state]

                            }}>
                                <div className={style.slideoutPanel}>
                                    <Header/>
                                    <div className={style.main}>
                                        <div className={style.mainLeft}>
                                            <GenresNav
                                                data={genreList}
                                                focus={focusGenresNav}
                                                selectedGenreId={this.selectedGenreId}
                                                onGenreSelect={this.onGenreSelect}
                                            />
                                        </div>
                                        <div className={style.mainRight}>
                                            <Gallery
                                                data={movieList}
                                                selectedMovie={selectedMovie}
                                                focusId={focusMovie}
                                                onMovieSelect={this.onMovieSelect}
                                                onBack={this.focusGenresNav}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {this.renderDetailedMovieInfo(selectedMovie)}
                            </div>
                        )}
                    </Transition>
                </div>
            )
        } else {
            return (
                <div className={style.spinnerContainer}>
                    <CircularProgress size={70}/>
                </div>
            )
        }
    }
}

export default App;