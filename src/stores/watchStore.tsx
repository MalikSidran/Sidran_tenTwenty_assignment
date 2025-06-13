import {create} from 'zustand';
import {instance} from '../axios/instance';
import {
  GetMovieImageResponse,
  MovieDetail,
  UpcomingMovieResponse,
  VideoListResponse,
} from '../interfaces/watch';

interface WatchStore {
  loading: boolean;
  upcomingMovieResponse: UpcomingMovieResponse | null;
  movieDetailResponse: MovieDetail | null;
  movieImageResponse: GetMovieImageResponse | null;
  movieVideosResponse: VideoListResponse | null;

  resetNewsStore: () => void;
  upcomingMoviesService: () => Promise<void>;
  movieDetailService: (movieId: number) => Promise<void>;
  movieImagesService: (movieId: string) => Promise<void>;
  movieVideosService: (movieId: number) => Promise<void>;
}

// Create Zustand store
const useWatchStore = create<WatchStore>(set => ({
  loading: false,
  upcomingMovieResponse: null,
  movieDetailResponse: null,
  movieImageResponse: null,
  movieVideosResponse: null,

  resetNewsStore: () => {
    set({
      loading: false,
      upcomingMovieResponse: null,
      movieDetailResponse: null,
      movieImageResponse: null,
      movieVideosResponse: null,
    });
  },

  upcomingMoviesService: async () => {
    set({loading: true});
    try {
      const response = await instance.get('upcoming');
      set({upcomingMovieResponse: response.data, loading: false});
    } catch (error) {
      console.error('Error in upcomingMoviesService:', error);
      set({loading: false});
    }
  },

  movieDetailService: async (movieId: number) => {
    set({loading: true});
    try {
      const response = await instance.get(
        `${movieId}?api_key=b5866838c92d2d3c249bf9ff18c8a2c5`,
      );
      set({movieDetailResponse: response.data, loading: false});
    } catch (error) {
      console.error('Error in movieDetailService:', error);
      set({loading: false});
    }
  },

  movieVideosService: async (movieId: number) => {
    set({loading: true});
    try {
      const response = await instance.get(
        `${movieId}/videos?api_key=b5866838c92d2d3c249bf9ff18c8a2c5`,
      );
      set({movieVideosResponse: response.data, loading: false});
    } catch (error) {
      console.error('Error in movieDetailService:', error);
      set({loading: false});
    }
  },

  movieImagesService: async (movieId: string) => {
    set({loading: true});
    try {
      const response = await instance.get(
        `${movieId}/images?api_key=b5866838c92d2d3c249bf9ff18c8a2c5`,
      );
      set({movieImageResponse: response.data, loading: false});
    } catch (error) {
      console.error('Error in movieImagesService:', error);
      set({loading: false});
    }
  },
}));

export default useWatchStore;
