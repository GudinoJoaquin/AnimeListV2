import { useState, useEffect } from "react";
import { AnimeProps, PaginationProps } from "@/utils/interfaces";
import { Sort } from "@/utils/types";
import axios from "axios";



export default function useAnimes(
  url: string, // Valor predeterminado para la URL
  order_by: string = "popularity", // Valor predeterminado para 'order_by'
  sort: Sort = "desc", // Valor predeterminado para 'sort'
  genres?: number[]
) {
  const [animes, setAnimes] = useState<AnimeProps[]>([]);
  const [pagination, setPagination] = useState<PaginationProps>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const params: any = {
    order_by: order_by,
    sort: sort,
    sfw: true,
    limit: 24,
    genres: genres?.join(','),
  }

  useEffect(() => {
    const fetchAnimes = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url, {
          params,
        });

        const animes = response.data.data
        setAnimes(animes)
        setPagination(response.data.pagination);
      } catch (err: any) {
        setError(err)
      } finally {
        setLoading(false);
      }
    };

    fetchAnimes();
  }, [url, order_by, sort]); // Ahora 'url', 'order_by' y 'sort' son dependencias

  return { animes, pagination, loading, error };
}
