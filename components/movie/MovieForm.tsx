import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Search } from 'lucide-react';

const MovieForm = ({ movie, onSave }) => {
    const [title, setTitle] = useState(movie ? movie.title : '');
    const [gender, setGender] = useState(movie ? movie.gender : '');
    const [duration, setDuration] = useState(movie ? movie.duration.toString() : '');
    const [synopsis, setSynopsis] = useState(movie ? movie.synopsis : '');
    const [rating, setRating] = useState(movie ? movie.rating : '');
    const [poster, setPoster] = useState(movie ? movie.poster : '');
    const [directorId, setDirectorId] = useState(movie ? movie.director?.id?.toString() : '');
    const [selectedActors, setSelectedActors] = useState(movie ? movie.actors || [] : []);
    const [selectedBands, setSelectedBands] = useState(movie ? movie.bands || [] : []);
    const [distributorId, setDistributorId] = useState(movie ? movie.distributor?.id?.toString() : '');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [directors, setDirectors] = useState([]);
    const [actors, setActors] = useState([]);
    const [bands, setBands] = useState([]);
    const [distributors, setDistributors] = useState([]);
    const [errors, setErrors] = useState({});

    const api_key = '4a3dab27ec9b91e69546e314a14c0a24';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = Cookies.get('access_token');
                const myHeaders = new Headers();
                myHeaders.append("Authorization", `Bearer ${token}`);

                const [directorsRes, actorsRes, bandRes, distributorsRes] = await Promise.all([
                    fetch('https://back-k1a3.onrender.com/director/?state=true', {
                        method: 'GET',
                        headers: myHeaders,
                    }),
                    fetch('https://back-k1a3.onrender.com/actor/?state=true', {
                        method: 'GET',
                        headers: myHeaders,
                    }),
                    fetch('https://back-k1a3.onrender.com/band/?state=true', {
                        method: 'GET',
                        headers: myHeaders,
                    }),
                    fetch('https://back-k1a3.onrender.com/distributor/?state=true', {
                        method: 'GET',
                        headers: myHeaders,
                    }),
                ]);

                const [directorsData, actorsData, bandsData, distributorsData] = await Promise.all([
                    directorsRes.json(),
                    actorsRes.json(),
                    bandRes.json(),
                    distributorsRes.json(),
                ]);

                setDirectors(directorsData.results || []);
                setActors(actorsData.results || []);
                setBands(bandsData.results || []);
                setDistributors(distributorsData.results || []);
            } catch (error) {
                console.error('Error fetching options:', error);
            }
        };

        fetchData();
    }, []);

    const validateForm = () => {
        const newErrors = {};

        if (!title.trim()) newErrors.title = 'El título es requerido';
        if (!gender.trim()) newErrors.gender = 'El género es requerido';
        if (!duration) newErrors.duration = 'La duración es requerida';
        if (!synopsis.trim()) newErrors.synopsis = 'La sinopsis es requerida';
        if (!rating) newErrors.rating = 'La calificación es requerida';
        if (selectedActors.length === 0) newErrors.actors = 'Se requiere al menos un actor';
        if (!directorId) newErrors.directorId = 'El director es requerido';
        if (selectedBands.length === 0) newErrors.bands = 'Se requiere al menos una banda sonora';
        if (!distributorId) newErrors.distributorId = 'El distribuidor es requerido';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleActorSelection = (actorId) => {
        const actor = actors.find(a => a.id === parseInt(actorId));
        if (actor && !selectedActors.some(a => a.id === actor.id)) {
            setSelectedActors([...selectedActors, { id: actor.id, name: actor.name }]);
        }
    };

    const handleBandSelection = (bandId) => {
        const band = bands.find(b => b.id === parseInt(bandId));
        if (band && !selectedBands.some(b => b.id === band.id)) {
            setSelectedBands([...selectedBands, { id: band.id, title: band.title, composer: band.composer }]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            alert('Por favor, complete todos los campos requeridos');
            return;
        }

        const selectedDirector = directors.find(d => d.id === parseInt(directorId));
        const selectedDistributor = distributors.find(d => d.id === parseInt(distributorId));
        const movieData = {
            title,
            gender,
            duration: parseInt(duration),
            synopsis,
            rating: parseFloat(rating),
            poster,
            director: {
                id: parseInt(directorId),
                name: selectedDirector?.name || ''
            },
            actors: selectedActors,
            bands: selectedBands.map(band => ({
                title: band.title,    // Ensure you are passing title
                composer: band.composer // Ensure you are passing composer
            })),
            distributor: {
                id: parseInt(distributorId),
                name: selectedDistributor?.name || ''
            }
        };

        try {
            const token = Cookies.get('access_token');
            const response = await fetch('https://back-k1a3.onrender.com/movie', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(movieData)
            });

            if (!response.ok) {
                const responseText = await response.text();
                throw new Error(responseText || 'Error al guardar la película');
            }

            const savedMovie = await response.json();
            onSave(savedMovie);
            alert('Película guardada exitosamente');
        } catch (error) {
            console.error('Error guardando película:', error);
            alert('Error al guardar la película: ' + error.message);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${searchQuery}&language=es-ES&page=1`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            setSearchResults(data.results);
        } catch (error) {
            console.error('Error searching movies:', error);
            alert('Error al buscar películas');
        }
    };

    const handleSelectMovie = async (movie) => {
        const movieUrl = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${api_key}&language=es-ES`;
        const creditsUrl = `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${api_key}&language=es-ES`;

        try {
            const [movieResponse, creditsResponse] = await Promise.all([
                fetch(movieUrl),
                fetch(creditsUrl)
            ]);

            const movieData = await movieResponse.json();
            const creditsData = await creditsResponse.json();

            setTitle(movie.title);
            setGender(movieData.genres?.[0]?.name || '');
            setDuration(movieData.runtime?.toString() || '');
            setSynopsis(movie.overview);
            setRating(movie.vote_average?.toString() || '');
            setPoster(movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '');

            const director = creditsData.crew.find(member => member.job === 'Director');
            if (director) {
                const directorInList = directors.find(d => d.name === director.name);
                if (directorInList) setDirectorId(directorInList.id.toString());
            }

            const mainActor = creditsData.cast[0];
            if (mainActor) {
                const actorInList = actors.find(a => a.name === mainActor.name);
                if (actorInList) setActorId(actorInList.id.toString());
            }

            const composer = creditsData.crew.find(member => member.job === 'Original Music Composer');
            if (composer) {
                const bandInList = bands.find(b => b.composer === composer.name);
                if (bandInList) setBandId(bandInList.id.toString());
            }

            const distributor = movieData.production_companies[0];
            if (distributor) {
                const distributorInList = distributors.find(d => d.name === distributor.name);
                if (distributorInList) setDistributorId(distributorInList.id.toString());
            }
        } catch (error) {
            console.error('Error obteniendo datos adicionales:', error);
            alert('Error al obtener datos de la película');
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
            <div className="relative pb-2">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-[90%]">
                    <div className="relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Buscar película..."
                            className="w-full px-4 py-3 pr-12 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent shadow-sm"
                        />
                        <button
                            onClick={handleSearch}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-pink-500"
                        >
                            <Search size={20} />
                        </button>
                    </div>

                    {searchResults.length > 0 && (
                        <div className="absolute w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-100 max-h-60 overflow-y-auto z-50">
                            {searchResults.map((movie) => (
                                <button
                                    key={movie.id}
                                    onClick={() => handleSelectMovie(movie)}
                                    className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-3"
                                >
                                    <img
                                        src={movie.poster_path
                                            ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                                            : '/api/placeholder/92/138'
                                        }
                                        alt={movie.title}
                                        className="w-12 h-16 object-cover rounded"
                                    />
                                    <div>
                                        <p className="font-medium text-gray-800">{movie.title}</p>
                                        <p className="text-sm text-gray-500">
                                            {new Date(movie.release_date).getFullYear()}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <h2 className="text-2xl font-bold text-center mt-12 mb-4 px-6">
                    {title ? `Editar: ${title}` : 'Nueva Película'}
                </h2>
            </div>

            <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Título</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className={`w-full px-3 py-2 rounded-md border ${errors.title ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent`}
                                placeholder="Título de la película"
                            />
                            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Género</label>
                            <input
                                type="text"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className={`w-full px-3 py-2 rounded-md border ${errors.gender ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent`}
                                placeholder="Género"
                            />
                            {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Duración (min)</label>
                            <input
                                type="number"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                className={`w-full px-3 py-2 rounded-md border ${errors.duration ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent`}
                                placeholder="120"
                            />
                            {errors.duration && <p className="text-red-500 text-xs mt-1">{errors.duration}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Calificación</label>
                            <input
                                type="number"
                                step="0.1"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                className={`w-full px-3 py-2 rounded-md border ${errors.rating ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent`}
                                placeholder="8.5"
                            />
                            {errors.rating && <p className="text-red-500 text-xs mt-1">{errors.rating}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Sinopsis</label>
                        <textarea
                            value={synopsis}
                            onChange={(e) => setSynopsis(e.target.value)}
                            rows={4}
                            className={`w-full px-3 py-2 rounded-md border ${errors.synopsis ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent`}
                            placeholder="Escribe la sinopsis de la película..."
                        />
                        {errors.synopsis && <p className="text-red-500 text-xs mt-1">{errors.synopsis}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">URL del Póster</label>
                        <input
                            type="text"
                            value={poster}
                            onChange={(e) => setPoster(e.target.value)}
                            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                            placeholder="https://..."
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Director</label>
                            <select
                                value={directorId}
                                onChange={(e) => setDirectorId(e.target.value)}
                                className={`w-full px-3 py-2 rounded-md border ${errors.directorId ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent`}
                            >
                                <option value="">Seleccionar Director</option>
                                {directors.map((director) => (
                                    <option key={director.id} value={director.id}>
                                        {director.name}
                                    </option>
                                ))}
                            </select>
                            {errors.directorId && <p className="text-red-500 text-xs mt-1">{errors.directorId}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Distribuidor</label>
                            <select
                                value={distributorId}
                                onChange={(e) => setDistributorId(e.target.value)}
                                className={`w-full px-3 py-2 rounded-md border ${errors.distributorId ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent`}
                            >
                                <option value="">Seleccionar Distribuidor</option>
                                {distributors.map((distributor) => (
                                    <option key={distributor.id} value={distributor.id}>
                                        {distributor.name}
                                    </option>
                                ))}
                            </select>
                            {errors.distributorId && <p className="text-red-500 text-xs mt-1">{errors.distributorId}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Actores</label>
                            <select
                                onChange={(e) => handleActorSelection(e.target.value)}
                                className={`w-full px-3 py-2 rounded-md border ${errors.actors ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent`}
                            >
                                <option value="">Seleccionar Actor</option>
                                {actors.map((actor) => (
                                    <option key={actor.id} value={actor.id}>
                                        {actor.name}
                                    </option>
                                ))}
                            </select>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {selectedActors.map((actor) => (
                                    <span key={actor.id} className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-pink-100 text-pink-800">
                                        {actor.name}
                                        <button
                                            type="button"
                                            onClick={() => setSelectedActors(selectedActors.filter(a => a.id !== actor.id))}
                                            className="ml-1 text-pink-600 hover:text-pink-800"
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                            {errors.actors && <p className="text-red-500 text-xs mt-1">{errors.actors}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Bandas Sonoras</label>
                            <select
                                onChange={(e) => handleBandSelection(e.target.value)}
                                className={`w-full px-3 py-2 rounded-md border ${errors.bands ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent`}
                            >
                                <option value="">Seleccionar Banda</option>
                                {bands.map((band) => (
                                    <option key={band.id} value={band.id}>
                                        {band.title} ({band.composer})
                                    </option>
                                ))}
                            </select>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {selectedBands.map((band) => (
                                    <span key={band.id} className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-pink-100 text-pink-800">
                                        {band.name}
                                        <button
                                            type="button"
                                            onClick={() => setSelectedBands(selectedBands.filter(b => b.id !== band.id))}
                                            className="ml-1 text-pink-600 hover:text-pink-800"
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                            {errors.bands && <p className="text-red-500 text-xs mt-1">{errors.bands}</p>}
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4 pt-4">
                        <button
                            type="button"
                            onClick={() => window.location.href = '/admin/movie'}
                            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors"
                        >
                            Guardar Película
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MovieForm;