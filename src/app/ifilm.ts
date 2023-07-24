export  interface Ifilm {
  _id: string;
  adult: boolean
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres : Igenres[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  production_companies : Iproduction_companies[];
  poster_path: string;
  production_countries : Iproduction_countries[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages :Ispoken_languages[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  videos : IVIDEO_RESULTS;
  vote_average: number;
  vote_count: number;
  credits : Icredits;
  RICO_FICHIER :  IRICO_FICHIER[];
  UPDATE_DB_DATE: string;

  present_streaming:boolean;

};

export interface IVIDEO_RESULTS {
  results : IVIDEO[];
}
export interface IVIDEO{
  iso_639_1 : string;
  iso_3166_1 : string;
  name :string;
  key:string;
  site:string;
  size:number;
  type:string;
  official:boolean;
  published_at:string;
  id:string;
}
export interface IRICO_FICHIER{
  serveur_name: string;
  insertDate: string;
  path: string;
  file: string;
  size: number;
  fileDate: string;
  InfoStreams : IInfoStreams[]
}


export interface  IInfoStreams
  {
    "index" : number,
    "CodecType" : string,
    "CodecName" : string,
    "duration" : number,
    "CodecLongName" : string,
    "TimeBase" : string,
    "Profile" : string,
    "tag-BPS" : string,
    "tag-DURATION" : string,
    "tag-NUMBER_OF_FRAMES" : string,
    "tag-NUMBER_OF_BYTES" : string,
    "AvgFrameRate" : number,
    "PixFmt" : string
  }

export interface Icrew
  {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    credit_id: string;
    department: string;
    job: string;
  };

  export interface Icast
  {
    adult: boolean;
    gender: 2;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    cast_id: number;
    character: string;
    credit_id:string;
    order: number;
  };

  export interface Icredits {
    cast: Icast[];
    crew : Icrew[];
  }

export interface  Ispoken_languages {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface Iproduction_countries {
  iso_3166_1: string;
  name: string;
}

export interface Igenres {
  id: number;
  name: string;
}
export  interface Iproduction_companies {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

