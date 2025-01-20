import { AnimeProps } from "@/utils/interfaces";
import axios from "axios";
import { useEffect, useState } from "react";

export default function useAnimeById(ids: number[] | string[]) {
  const [animes, setAnimes] = useState<AnimeProps[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnimeById = async () => {
      setLoading(true);
      try {
        let fetchedAnimes = []
        for(const id of ids){
            const response = await axios.get(
              `https://api.jikan.moe/v4/anime/${id}/`
            );
            fetchedAnimes.push(response.data.data)
        }
        setAnimes(fetchedAnimes);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnimeById();
  }, []);

  return { animes, loading, error };
}
