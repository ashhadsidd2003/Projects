import React, { useState , useEffect } from "react";
import Search from "./components/Search.jsx";
import Spinner from "./components/Spinner.jsx"
import MovieCard from "./components/MovieCard.jsx"
import { useDebounce } from "react-use";
import { updateSearchCount,getTrendingMovies } from "./appwrite.js";

const GENRE_MAP = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western"
};


const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept : "application/json",
    Authorization : `Bearer ${API_KEY}` 
  }
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [isTrendingLoading, setIsTrendingLoading] = useState(false);
  const [trendingError, setTrendingError] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);




  useDebounce(() => setDebouncedSearchTerm(searchTerm),500,[searchTerm]);

  const fetchMovies = async (query = "") => {
    setLoading(true);
    setErrorMessage("");
    try {
      const endpoint = query 
      ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      :`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();

      if (data.Response === 'False') {
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setMovieList([]);
        return;
      }

      setMovieList(data.results || []);

      if (query && data.results.length > 0) {
        await updateSearchCount(query,data.results[0])      
      }

    } catch (error) {
      console.log(`Error fetching movies : ${error}`);     
    } finally {
      setLoading(false);
    }
    
  }

  const loadTrendingMovies = async () => {
    setIsTrendingLoading(true);
    setTrendingError('');

    try {
      const movies = await getTrendingMovies();
      if (!movies || movies.length === 0) {
        setTrendingError('No trending movies found.');
        setTrendingMovies([]); 
        return;
      }

      setTrendingMovies(movies);
    } catch (err) {
      console.error(`Error fetching trending movies: ${err}`);
      setTrendingError('Failed to load trending movies. Please try again later.');
      setTrendingMovies([]);

    }finally {
      setIsTrendingLoading(false);  
    }
  }


  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm])

  useEffect(() => {
    loadTrendingMovies();
  }, []);
  
  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="./hero-img.png" alt="hero banner" />
          <h1>Find <span className="text-gradient">Movies</span> you will enjoy</h1>

          <Search  searchTerm = {searchTerm}  setSearchTerm = {setSearchTerm} />
        </header>

        {
         !debouncedSearchTerm ? (
          isTrendingLoading ? (
            <Spinner />
          ) : trendingError ? (
            <p className="text-red-500">{trendingError}</p>
          ) : (
            <section className="trending">
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id} >
                <p>{index + 1}</p>
                <img src={movie.poster_url} alt={movie.title} />
                </li>
                 ))}
            </ul>
            </section>
          )
        ) : null
        }




        <section className="all-movies">
          <h2>All Movies</h2>

          {
            loading ? (
              <Spinner />
            ) : errorMessage ? (
              <p className="text-red-500">{errorMessage}</p>
            ) : (
              <ul>
                {movieList.map((movie) => (
                  <li key={movie.id} onClick={() => setSelectedMovie(movie)} style={{ cursor: "pointer", listStyle: "none" }}>
                  <MovieCard movie={movie}/>
                  </li>
                ))}               
              </ul>
            )
          }

        </section>

        {selectedMovie && (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex flex-col items-center justify-center text-white p-6 overflow-auto">
    <button
      onClick={() => setSelectedMovie(null)}
      className="absolute top-6 right-8 text-3xl font-bold text-gray-300 hover:text-red-500 transition"
    >
      ✖
    </button>

    <img
      src={
        selectedMovie.poster_path
          ? `https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`
          : '/No-Poster.png' 
      }
      alt={selectedMovie.title}
      className="w-64 md:w-80 lg:w-96 rounded-xl shadow-lg mb-6"
    />

    <h2 className="text-3xl font-bold mb-4 text-center">{selectedMovie.title}</h2>

    <div className="text-center space-y-2 max-w-2xl">
      <p className="text-lg italic opacity-90">{selectedMovie.overview}</p>

      <div className="flex flex-wrap justify-center gap-4 text-sm mt-4">
        <p>
          <span className="font-semibold">Language:</span>{" "}
          {selectedMovie.original_language?.toUpperCase() || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Release:</span>{" "}
          {selectedMovie.release_date?.split("-")[0] || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Rating:</span> ⭐{" "}
          {selectedMovie.vote_average?.toFixed(1) || "N/A"}
        </p>
        {selectedMovie.genre_ids && (
          <p>
            <span className="font-semibold">Genres:</span>{" "}
            {selectedMovie.genre_ids
              .map((id) => GENRE_MAP[id] || "Unknown")
              .join(", ")}
          </p>
        )}
      </div>
    </div>
  </div>
)}


      </div>

    </main>
  )
}




export default App
