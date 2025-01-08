import { useState, useEffect } from "react";
import { AnimeProps, PaginationProps } from "@/utils/interfaces";

export const getAnimes = (url: string) => {
  const [animes, setAnimes] = useState<AnimeProps[]>([]);
  const [pagination, setPagination] = useState<PaginationProps>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnimes = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const data = await response.json();
        setAnimes(data.data);
        setPagination(data.pagination);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimes();
  }, [url]); // Se ejecuta cada vez que la URL cambie

  return { animes, pagination, loading, error };
};

export const getAnimeById = (id: number | string | string[]) => {
  const [anime, setAnime] = useState<AnimeProps | null >(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnimeById = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/`);
        const data = await response.json();
        setAnime(data.data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnimeById();
  }, []);

  return { anime, loading, error };
};

export const getRandomAnime = () => {
  const [animes, setAnimes] = useState<AnimeProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRandomAnimes() {
      try {
        // Realiza 25 solicitudes al endpoint de anime aleatorio
        const response = await fetch("https://api.jikan.moe/v4/random/anime");
        const data = await response.json();
        setAnimes(data.data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchRandomAnimes();
  }, []);

  return { animes, loading, error };
};
