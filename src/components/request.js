const API_KEY = "9f962ccb97148968dbbafc669c7a1635";

const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchOriginals: `/discover/tv?api_key=${API_KEY}&with_network=213`,
  fetchToprated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchAction: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedy: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorror: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomance: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`
};

export default requests;
