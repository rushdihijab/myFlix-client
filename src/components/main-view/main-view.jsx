import React from 'react';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null
        };
    }
    componentDidMount() {
        axios.get('https://my-movies-rushdi.herokuapp.com/movies')
            .then(Response => {
                this.setState({
                    movies: Response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    setSelectedMovie(movie) {
        this.setState({
            selectedMovie: movie
        });

    }
    /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

    onLoggedIn(user) {
        this.setState({
            user
        });
    }
    onRegistration(newUser) {
        this.setState({
            newUser
        });
    }

    render() {
        const { movies, selectedMovie, user, newUser } = this.state;

        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
        if (!newUser) return <RegistrationView onRegistration={newUser => this.onRegistration(newUser)} />;
        if (movies.length === 0) return <div className="main-view" />;
        return (
            <div className="main-view">
                {selectedMovie
                    ? (
                        <Row className="justify-content-md-center">
                            <Col md={8}>
                                <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                            </Col>
                        </Row>
                    )
                    : (
                        <Row className="justify-content-md-center">
                            {movies.map(movie => (
                                <Col md={3}>
                                    <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                                </Col>
                            ))}
                        </Row>
                    )
                }
            </div>
        );
    }

}
