import { AnimeProps } from "@/utils/interfaces";
import axios from "axios";
import { useEffect, useState } from "react";

export default function useRandomAnime() {
  const [animes, setAnimes] = useState<AnimeProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRandomAnimes() {
      try {
        // Realiza 25 solicitudes al endpoint de anime aleatorio
        const response = await axios.get(
          "https://api.jikan.moe/v4/random/anime"
        );
        setAnimes(response.data.data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchRandomAnimes();
  }, []);

  return { animes, loading, error };
}
