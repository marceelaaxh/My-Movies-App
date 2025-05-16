'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { getNowPlaying } from '@/services/movies/getNowPlaying'
import MovieList from '@/components/MovieList/MovieList'
import SectionNavigation from '@/components/SectionNavigation/SectionNavigation'

const NowPlayingPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page') || 1)

  const [movies, setMovies] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetchNowPlayingMovies = async () => {
      setLoading(true)
      try {
        const data = await getNowPlaying(currentPage)
        setMovies(data.results)
        setTotalPages(Math.min(data.total_pages))
      } catch (err) {
        console.error('Error loading movies:', err)
      }
      setLoading(false)
    }

    fetchNowPlayingMovies()
  }, [currentPage])

  return (
    <div>
      <h3 className="text-3xl font-bold mb-6">Now Playing</h3>
      {loading && (
        <h5 className="text-lg text-gray-500">Loading favorites...</h5>
      )}
      {!loading && <MovieList movies={movies} origin="Now-playing" />}

      {!loading && movies.length > 0 && (
        <SectionNavigation
          page={currentPage}
          totalPages={totalPages}
          prev={`/now-playing?page=${currentPage - 1}`}
          next={`/now-playing?page=${currentPage + 1}`}
        />
      )}
    </div>
  )
}

export default NowPlayingPage