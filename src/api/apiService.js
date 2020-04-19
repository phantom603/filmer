import axios from 'axios';

export const API = axios.create({
    baseURL: 'https://raw.githubusercontent.com/roman-curse/videoJson/master'
})

export async function fetchAllData() {
    return await API.get('videoJson.json');
}

export async function fetchGenres() { // TODO: here will be a real get request from api instead of this promise
    const response = await fetchAllData();
    if (response?.data?.results) {
        const allGenres = response.data.results.flatMap(movie => movie.genre_ids);
        const uniqueGenres = [...new Set(allGenres)].sort();
        const result = {};
        uniqueGenres.forEach((v, i) => { // i - it's a fake id, which will be replaced by real
            result[i] = { name: v, id: i }
        })
        return result;
    }
}

export async function fetchMoviesByGenreId(id) { // TODO: here will be a real get request from api instead of this promise
    const allData = await fetchAllData();
    const genres = await fetchGenres();
    if (allData?.data?.results && genres) {
        return allData.data.results.filter((movie) => movie['genre_ids'].includes(genres[id].name));
    }
}

export async function fetchMovieDataById(id) { // TODO: here will be a real get request from api instead of this promise
    const response = await fetchAllData();
    if (response?.data?.results) {
        return response.data.results.find(el => el.id === id);
    }
}