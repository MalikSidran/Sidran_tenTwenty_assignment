// upcoming movies
export interface UpcomingMovieResponse {
    dates: {
      maximum: string;
      minimum: string;
    };
    page: number;
    results: Movie[];
  }
  
  export interface Movie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }

  // Movie Detail 
  interface Genre {
    id: number;
    name: string;
  }
  
  interface ProductionCompany {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }
  
  interface ProductionCountry {
    iso_3166_1: string;
    name: string;
  }
  
  interface SpokenLanguage {
    english_name: string;
    iso_639_1: string;
    name: string;
  }
  
  export interface MovieDetail {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: any | null;
    budget: number;
    genres: Genre[];
    homepage: string;
    id: number;
    imdb_id: string;
    origin_country: string[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: SpokenLanguage[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }

  // Movie Image
  export interface MovieBackdrop {
    aspect_ratio: number;
    file_path: string;
    height: number;
    iso_639_1?: string | null;
    vote_average: number;
    vote_count: number;
    width: number;
  }
  
  export interface GetMovieImageResponse {
    backdrops: MovieBackdrop[];
  }

  // Video Api response 
 export interface Trailer {
    id: string;
    iso_639_1: string;
    iso_3166_1: string;
    key: string;
    name: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
  }
  
  export interface VideoListResponse {
    results: Trailer[];
  }
  
  
  