import { axiosCache } from '~/utils/axios/cache';

import type { MDBListCatalogStatus } from '../types/catalog/catalog-status';
import { MDBListCatalogStatus } from '../types/catalog/catalog-status';
import type { MDBListCatalogType } from '../types/catalog/catalog-type';
import { MDBListCatalogType } from '../types/catalog/catalog-type';
import type { MDBListUserSettings } from '../types/user-settings';

interface MDBListWatchlistItem {
  id: number;
  adult: number;
  title: string;
  imdb_id: string;
  tvdb_id: number | null;
  language: string;
  mediatype: 'movie' | 'show';
  release_year: number;
  watchlist_at?: string;
  spoken_language: string;
  country: string;
  rank: number;
}

interface MDBListWatchedItem {
  last_watched_at: string;
  movie?: {
    title: string;
    year: number;
    ids: {
      imdb?: string;
      tmdb?: number;
      trakt?: number;
      mdblist?: string;
      tvdb?: number;
    };
  };
  show?: {
    title: string;
    year: number;
    ids: {
      imdb?: string;
      tmdb?: number;
      trakt?: number;
      mdblist?: string;
      tvdb?: number;
    };
  };
}

interface MDBListDroppedItem {
  dropped_at: string;
  show: {
    title: string;
    year: number;
    ids: {
      imdb?: string;
      tmdb?: number;
      trakt?: number;
      mdblist?: string;
      tvdb?: number;
    };
  };
}

export interface MDBListLibrary {
  movies: MDBListWatchlistItem[];
  shows: MDBListWatchlistItem[];
}

export interface MDBListWatchedLibrary {
  movies: MDBListWatchedItem[];
  shows: MDBListWatchedItem[];
}

export interface MDBListDroppedLibrary {
  shows: MDBListDroppedItem[];
}

export async function getMDBListMetaPreviews(
  type: MDBListCatalogType,
  status: MDBListCatalogStatus,
  userConfig: MDBListUserSettings,
): Promise<MDBListLibrary> {
  if (!userConfig.auth) {
    throw new Error('No user config! This should not happen!');
  }

  try {
    // Map catalog status to API endpoint
    let url: string;
    let responseTransform: (data: any) => MDBListLibrary;

    switch (status) {
      case MDBListCatalogStatus.PLANTOWATCH:
        // Watchlist endpoint
        url = `https://api.mdblist.com/watchlist/items?apikey=${userConfig.auth.apikey}&limit=100`;
        responseTransform = (data) => ({
          movies: (data.movies || []).map((item: MDBListWatchlistItem) => ({
            ...item,
            mediatype: 'movie' as const,
          })),
          shows: (data.shows || []).map((item: MDBListWatchlistItem) => ({
            ...item,
            mediatype: 'show' as const,
          })),
        });
        break;

      case MDBListCatalogStatus.COMPLETED:
        // Watched history endpoint
        url = `https://api.mdblist.com/sync/watched?apikey=${userConfig.auth.apikey}&limit=100`;
        responseTransform = (data) => ({
          movies: (data.movies || []).map((item: MDBListWatchedItem) => ({
            id: 0,
            adult: 0,
            title: item.movie?.title || '',
            imdb_id: item.movie?.ids.imdb || '',
            tvdb_id: item.movie?.ids.tvdb || null,
            language: 'en',
            mediatype: 'movie' as const,
            release_year: item.movie?.year || 0,
            watchlist_at: item.last_watched_at,
            spoken_language: 'en',
            country: 'us',
            rank: 0,
          })),
          shows: (data.shows || []).map((item: MDBListWatchedItem) => ({
            id: 0,
            adult: 0,
            title: item.show?.title || '',
            imdb_id: item.show?.ids.imdb || '',
            tvdb_id: item.show?.ids.tvdb || null,
            language: 'en',
            mediatype: 'show' as const,
            release_year: item.show?.year || 0,
            watchlist_at: item.last_watched_at,
            spoken_language: 'en',
            country: 'us',
            rank: 0,
          })),
        });
        break;

      case MDBListCatalogStatus.WATCHING:
        // For "watching" status, we use watched endpoint and filter for shows
        url = `https://api.mdblist.com/sync/watched?apikey=${userConfig.auth.apikey}&limit=100`;
        responseTransform = (data) => ({
          movies: [],
          shows: (data.shows || []).map((item: MDBListWatchedItem) => ({
            id: 0,
            adult: 0,
            title: item.show?.title || '',
            imdb_id: item.show?.ids.imdb || '',
            tvdb_id: item.show?.ids.tvdb || null,
            language: 'en',
            mediatype: 'show' as const,
            release_year: item.show?.year || 0,
            watchlist_at: item.last_watched_at,
            spoken_language: 'en',
            country: 'us',
            rank: 0,
          })),
        });
        break;

      case MDBListCatalogStatus.DROPPED:
        // Dropped shows endpoint
        url = `https://api.mdblist.com/sync/dropped?apikey=${userConfig.auth.apikey}&limit=100`;
        responseTransform = (data) => ({
          movies: [],
          shows: (data.shows || []).map((item: MDBListDroppedItem) => ({
            id: 0,
            adult: 0,
            title: item.show.title,
            imdb_id: item.show.ids.imdb || '',
            tvdb_id: item.show.ids.tvdb || null,
            language: 'en',
            mediatype: 'show' as const,
            release_year: item.show.year,
            watchlist_at: item.dropped_at,
            spoken_language: 'en',
            country: 'us',
            rank: 0,
          })),
        });
        break;

      default:
        throw new Error(`Unsupported catalog status: ${status}`);
    }

    const response = await axiosCache(url, {
      id: `mdblist-${type}-${status}-${userConfig.auth.apikey}`,
      method: 'GET',
      cache: {
        ttl: 1000 * 60 * 20, // 20 minutes
        interpretHeader: false,
        staleIfError: 60 * 60 * 5, // 5 hours
      },
    });

    const transformedData = responseTransform(await response.data);

    // Filter by type if specified
    if (type === MDBListCatalogType.MOVIES) {
      return {
        movies: transformedData.movies,
        shows: [],
      };
    } else if (type === MDBListCatalogType.SHOWS) {
      return {
        movies: [],
        shows: transformedData.shows,
      };
    }

    return transformedData;
  } catch (e) {
    console.error('Failed to fetch MDBList catalog data:', e);
    return {
      movies: [],
      shows: [],
    };
  }
}
