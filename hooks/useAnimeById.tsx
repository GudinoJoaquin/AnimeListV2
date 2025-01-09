import { AnimeProps } from "@/utils/interfaces";
import axios from "axios";
import { useEffect, useState } from "react";

export default function useAnimeById(id: number | string | string[]) {
  const [anime, setAnime] = useState<AnimeProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnimeById = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.jikan.moe/v4/anime/${id}/`
        );
        setAnime(response.data.data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnimeById();
  }, []);

  return { anime, loading, error };
}
