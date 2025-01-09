import { StatsProps } from "@/utils/interfaces"
import axios from "axios"
import { useEffect, useState } from "react"

export const getAnimeStats = (id: number | string | string[]) => {
    const [animeStats, setAnimeStats] = useState<StatsProps>()
    const [error, setError] = useState(null)
  
    useEffect(() => {
      async function fetchStatisticsAnime(){
        try{
          const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}/statistics`)
          setAnimeStats(response.data.data)
        } catch(err: any){
          setError(err)
        } 
      }
      fetchStatisticsAnime()
    }, [])
  
    return animeStats
  }