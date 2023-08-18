import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router';
import useFetch from './fetch';
import NavBar from './NavBar';
import Pagination from 'react-bootstrap/Pagination';
import Container from 'react-bootstrap/Container';

const MoviesList = () => {
    const navigate = useNavigate();
    const { data: movieList, isLoading, error, fetchData, pageNumber, totalPages } = useFetch()
    const [currentPage, setCurrentPage] = useState(1)
    const [nextPageAvailable, setNextPageAvailable] = useState(true)
    const [search, setSearch] = useState()


    const movieClick = (id) => {

        navigate(`/detail/${id}`)
    }

    useEffect(() => {
        const getData = async () => {
            search ?
                await fetchData("https://api.themoviedb.org/3/search/movie?query=" + search + "&page=" + currentPage)
                : await fetchData("https://api.themoviedb.org/3/movie/upcoming?page=" + currentPage)
        }
        getData()
        if (movieList) {
            setNextPageAvailable(movieList.page < movieList.total_pages)
        }
    }, [currentPage, search])

    const pageChange = (value) => {
        setCurrentPage(value)
    }

    const handleSearch = (value) => {
        setSearch(value)
    }
    return (
        <>
            <NavBar handleSearch={handleSearch} />
            <br />
            <Container fluid>
                <Row xs={2} md={5} className="g-4">

                    {!isLoading && movieList ? <>
                        {movieList.results.map((movie) => {
                            return (<>
                                <Col key={movie.id}>
                                    <Card onClick={() => movieClick(movie.id)}>
                                        <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                                        <Card.Body>
                                            <Card.Title className="justify-content-begin">
                                                <Row>
                                                    <Col sm={8} className="justify-content-start movieTitle" >{movie.title}</Col>
                                                    <Col sm={4} className="justify-content-end movieTitle">{movie.vote_average}</Col>
                                                </Row>
                                            </Card.Title>
                                            <Card.Text>
                                                {movie.overview.slice(0, 90)}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </>)
                        })}
                        <br />
                        <Pagination>
                            <Pagination.First onClick={() => pageChange(1)} />
                            {currentPage < 3 ?
                                <Pagination.Prev disabled onClick={() => pageChange(currentPage - 1)} /> :
                                <Pagination>
                                    <Pagination.Prev onClick={() => pageChange(1)} />
                                    <Pagination.Ellipsis />
                                </Pagination>}
                            {currentPage !== 1 ? <Pagination.Item onClick={() => pageChange(currentPage - 1)}>{currentPage - 1}</Pagination.Item> : null}
                            <Pagination.Item active>{currentPage}</Pagination.Item>
                            {currentPage < totalPages - 1 ? <Pagination.Item onClick={() => pageChange(currentPage + 1)}>{currentPage + 1}</Pagination.Item> : null}


                            {currentPage < totalPages - 1 ? <Pagination.Ellipsis /> : null}

                            {nextPageAvailable ? <Pagination><Pagination.Item onClick={() => pageChange(totalPages)}>{totalPages}</Pagination.Item><Pagination.Next onClick={() => pageChange(currentPage + 1)} /></Pagination> : <Pagination.Next disabled />}
                            <Pagination.Last onClick={() => pageChange(totalPages)} />
                        </Pagination>
                    </> : <p>{error}</p>

                    }
                </Row>
            </Container>
        </>
    );
}

export default MoviesList;