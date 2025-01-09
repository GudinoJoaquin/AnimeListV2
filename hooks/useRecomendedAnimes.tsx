import { AnimeProps } from "@/utils/interfaces";
import axios from "axios";
import { useEffect, useState } from "react";

export default function useRecomendedAnimes() {
    const [animes, setAnimes] = useState<AnimeProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchAnimes = async () => {
        setLoading(true);
        try {
          const response = await axios.get('https://api.jikan.moe/v4/recommendations/anime', {
            params: {
              order_by: 'popularity'
            }
          });
          setAnimes(response.data.data);
        } catch (err: any) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchAnimes();
    }, []); // Se ejecuta cada vez que la URL cambie
  
    return { animes, loading, error };
  };