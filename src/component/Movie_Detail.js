import React, { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router';
import Image from 'react-bootstrap/Image';
import NavBar from './NavBar';
import useFetch from './fetch';
import Container from 'react-bootstrap/Container';

const MoviesDetail = () => {

    let { id } = useParams();

    const { data: castdetails, isLoading: castLoading, error: castError, fetchData: castFetch } = useFetch("Details")
    const { data: movie, isLoading: movieLoading, error: movieEror, fetchData: movieFetch } = useFetch("Details")

    useEffect(() => {
        movieFetch("https://api.themoviedb.org/3/movie/" + id)
        castFetch("https://api.themoviedb.org/3/movie/" + id + "/credits")
    }, [])
    return (
        <>
            <NavBar />
            <br />
            <Container fluid>
                {!movieLoading && movie && !castLoading && castdetails ? <Row style={{ width: "100%" }}>
                    <Col md lg="2" className="justify-content-start">
                        <Image className="image-set" src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`} rounded />
                    </Col>
                    <Col md lg="10">
                        <Row className="rowclass">
                            <p className="justify-content-start detail-line"><b>{movie.title}</b><pre>   </pre>({movie.vote_average})</p>
                        </Row>
                        <Row className="rowclass">
                            <p className="justify-content-start detail-line">{movie.release_date.slice(0.5)} | {movie.runtime} |
                                {Object.values(castdetails.crew).map(crew => {
                                    if (crew.job === "Director") {
                                        return " " + crew.name;
                                    }
                                })}
                            </p>
                        </Row>
                        <Row className="description-text">
                            <p className="justify-content-start detail-line">Cast : {Object.values(castdetails.cast).map(cast => {

                                return cast.name + ", ";
                            })}</p>
                        </Row>
                        <Row className="description-text">
                            <p className="justify-content-start detail-line">Description : {movie.overview}</p>
                        </Row>


                    </Col>
                </Row> : <>
                    {movieEror && <p>{movieEror}</p>}
                    {castError && <p>{castError}</p>}
                </>}
            </Container>
        </>
    );
}

export default MoviesDetail;