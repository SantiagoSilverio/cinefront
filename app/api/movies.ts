import axios from 'axios';

const API_KEY = 'caafb95311dcb2fe4da1e916374740c9';
const BASE_URL = 'https://api.themoviedb.org/3';

export async function getCurrentMovies() {
  const response = await axios.get(`${BASE_URL}/movie/now_playing`, {
    params: {
      api_key: API_KEY,
      language: 'es-MX', // O el idioma que prefieras
    },
  });
  return response.data.results;
}

export async function getUpcomingMovies() {
  const response = await axios.get(`${BASE_URL}/movie/upcoming`, {
    params: {
      api_key: API_KEY,
      language: 'es-MX',
    },
  });
  return response.data.results;
}