import { AnimeStatusType } from "./types"

export interface AnimeProps {
    mal_id: number
    url: string
    images:{
      jpg: {
        image_url: string
        small_image_url: string
        large_image_url: string
      }
    }
    trailer: TrailerProps
    approved: boolean
    title: string
    title_english: string
    title_japanese: string
    title_synonyms: string
    type: string
    episodes: number
    status: string
    airing: boolean
    aired: AiredProps
    duration: string
    rating: string
    score: number
    scored_by: number
    rank: number
    popularity: number
    members: number
    favorites: number
    synopsis: string
    background: string
    season: string
    year: number
    broadcast: {
      day: string
      time: string
      timezone: string
      string: string
    }
    producers: Entity[]
    licensors: Entity[]
    studios: Entity[]
    genres: Entity[]
    themes: Entity[]
    entry: AnimeProps[]
}

export interface StatsProps {
  watching: number
  completed: number
  on_hold: number
  dropped: number
  plan_to_watch: number
  total: number
  scores: {
    score: number
    votes: number
    percentage: number
  }
}

export interface AnimesDataProps {
  user_id?: number
  anime_id: number
  anime_score: number
  anime_episodes_watched: number
  anime_status: AnimeStatusType
  saved_at: string
}


export interface PaginationProps {
    last_visible_page: number
    has_next_page: boolean
    current_page: number
    items: {
        count: number
        total: number
        per_page: number
    }
}

export interface Entity {
  mal_id: number
  type: string
  name: string
  url: string
}

export interface DateRange {
  day: number
  month: number
  year: number
}

export interface TrailerProps {
  youtube_id: string
  url: string
  embed_url: string
  images: {
    image_url: string
    small_image_url: string
    medium_image_url: string
    large_image_url: string
    maxium_image_url: string
  }
}

export interface AiredProps {
  from: string
  to: string
  prop: {
    from: DateRange
    to: DateRange
  }
  string: string
}
