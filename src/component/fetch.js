import { useState, useEffect } from 'react';

const useFetch = (value) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pageNumber, setPageNumber] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const fetchData = async (url) => {
        try {
            setIsLoading(true);
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2Mzg0OTdiNTgwYTdkY2MxNWFmYTU5NGYyOTA3YjkwZiIsInN1YiI6IjY0ZGVkN2Q5NWFiODFhMDExYzJlM2YxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZLbAJAq26oqYaYwSA78LAU4-d_YTv-LV3W_880EoKXg'
                }
            }
            const response = await fetch(url, options)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const json = await response.json();
            setData(json);
            if (!value) {
                setPageNumber(json.page)
                setTotalPages(json.total_pages)
            }
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { data, isLoading, error, fetchData, pageNumber, totalPages };
}

export default useFetch;
