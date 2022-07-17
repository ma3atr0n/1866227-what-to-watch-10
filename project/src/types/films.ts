export type Player = {
  link: string,
  poster: string
}

export type Rate = {
  score: number,
  level: string,
  count: number
};

export type FilmDetail = {
  director: string,
  starring: string,
  runTime: number,
  description: string,
  rate: Rate
};

export type Film = {
  id: string,
  title: string,
  previewUrl: string,
  posterUrl: string,
  backGroundUrl: string,
  genre: string,
  year: number,
  details: FilmDetail,
  player: Player
};

export type Films = Film[];
