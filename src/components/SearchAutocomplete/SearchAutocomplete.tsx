'use client'

import React, { useEffect, useState } from 'react'
import { getSearchMovies } from '@/services/movies/getSearchMovies'
import { useRouter } from 'next/navigation'

const SearchAutocomplete = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const fetchResults = async () => {
        if (query.length < 2) {
          setResults([])
          return
        }

        setLoading(true)
        try {
          const movies = await getSearchMovies(query)
          setResults(movies.slice(0, 8)) // solo 8 resultados
        } catch (err) {
          console.error('Error searching:', err)
        } finally {
          setLoading(false)
        }
      }

      fetchResults()
    }, 300) // debounce 300ms

    return () => clearTimeout(delayDebounce)
  }, [query])

  const handleSelect = (id: number) => {
    router.push(`/movie/${id}`)
    setQuery('')
    setResults([])
  }

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar película..."
        className="w-full px-4 py-2 rounded-full text-black shadow-md focus:outline-none"
      />
        {results.length > 0 && (
        <ul className="absolute w-full mt-2 bg-white text-black rounded-lg shadow z-10 max-h-64 overflow-y-auto">
            {results.map((movie, idx) => (
            <li
                key={movie.id}
                onClick={() => handleSelect(movie.id)}
                className={`px-4 py-3 cursor-pointer hover:bg-gray-100 text-left ${
                idx !== results.length - 1 ? "border-b border-gray-200" : ""
                }`}
            >
                <div className="font-medium">
                🎬 {movie.title}
                </div>
                {movie.release_date && (
                <div className="text-sm text-gray-500">
                    ({new Date(movie.release_date).getFullYear()})
                </div>
                )}
            </li>
            ))}
        </ul>
        )}
      {loading && (
        <div className="absolute mt-2 text-white text-sm">Buscando...</div>
      )}
    </div>
  )
}

export default SearchAutocomplete